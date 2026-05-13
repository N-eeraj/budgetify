import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { and, eq, gt, type ExtractTablesWithRelations } from 'drizzle-orm';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import { db } from 'src/db/index.drizzle';
import { authTokens, users, verificationEmails } from 'src/db/schemas/index.drizzle';
import { EmailService } from 'src/services/email.service';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { readFileSync } from 'fs';
import { join } from 'path';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

export interface UserLogin extends Pick<CreateUserDto, 'email' | 'name'> {
  id: number;
  token: string;
  avatarUrl?: string | null;
}

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 12;
  private readonly EMAIL_OTP_VALIDITY = 9_00_000; // 15 minutes in ms
  private readonly EMAIL_OTP_RETRY = 3_00_000; // 5 minutes in ms
  private readonly BYPASS_OTP = process.env.BYPASS_OTP === 'true';

  constructor(private readonly emailService: EmailService) {}

  async ensureUniqueEmail(email: string) {
    const existingUser = await db
      .select({
        id: users.id,
      })
      .from(users)
      .where(
        eq(users.email, email)
      );
    if (existingUser.length) {
      throw new ConflictException({
        success: false,
        message: 'Account already exists, please login',
        errors: {
          email: [
            'Email is already in use',
          ],
        },
      });
    }
  }

  async sendVerificationMail(email: string) {
    if (this.BYPASS_OTP) return;

    const [existingEntry] = await db
      .select({
        updatedAt: verificationEmails.updatedAt,
      })
      .from(verificationEmails)
      .where(
        eq(verificationEmails.email, email)
      );

    // check if the retry cooldown period has elapsed
    if (existingEntry?.updatedAt) {
      const retryTime = new Date(existingEntry.updatedAt.getTime() + this.EMAIL_OTP_RETRY);
      const now = new Date();
      const secondsRemaining = Math.floor((retryTime.getTime() - now.getTime()) / 1_000);
      if (secondsRemaining > 0) {
        throw new BadRequestException({
          success: false,
          message: 'Please wait before requesting another OTP',
          errors: {
            retryIn: secondsRemaining,
          },
        });
      }
    }

    // generates OTP, expires at and read HTML email template
    const otp = crypto.randomInt(0, 999_999)
      .toString()
      .padStart(6, '0');

    const templatePath = join(
      process.cwd(),
      'src/assets/templates/email-verification.html',
    );
    let html = readFileSync(templatePath, 'utf-8');
    html = html.replace('{{OTP}}', otp);

    const expiresAt = new Date(Date.now() + this.EMAIL_OTP_VALIDITY);
    const hashedOtp = await bcrypt.hash(otp, this.SALT_ROUNDS);

    // upsert OTP and expires at fields
    await db
      .insert(verificationEmails)
      .values({
        email,
        otp: hashedOtp,
        expiresAt,
      })
      .onConflictDoUpdate({
        target: verificationEmails.email,
        set: {
          otp: hashedOtp,
          expiresAt,
        },
      });

    // send verification email
    this.emailService.sendMail({
      recipients: [
        { email },
      ],
      category: 'Email Verification',
      subject: 'Email Verification',
      body: {
        type: 'html',
        content: html,
      },
    });
  }

  async createSessionToken(
    userId: number,
    tx?: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>
  ): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(token, this.SALT_ROUNDS);

    await (tx ?? db)
      .insert(authTokens)
      .values({
        token: hashedToken,
        userId,
      });

    return token;
  }

  async verifyOtp({ email, otp }: Pick<CreateUserDto, 'email' | 'otp'>) {
    if (this.BYPASS_OTP) return;

    const [verificationRecord] = await db
      .select()
      .from(verificationEmails)
      .where(
        and(
          eq(verificationEmails.email, email),
          gt(verificationEmails.expiresAt, new Date()),
        )
      );
    // check if valid otp exists
    if (!verificationRecord) {
      throw new UnauthorizedException({
        success: false,
        message: 'Please request a verification a new code',
      });
    }

    // check if otp matches
    const matchingOtp = await bcrypt.compare(otp, verificationRecord.otp);
    if (!matchingOtp) {
      throw new UnauthorizedException({
        success: false,
        message: 'Incorrect OTP',
        errors: {
          otp: [
            'Incorrect OTP',
          ],
        },
      });
    }
  }

  async createUser({ email, name, password }: Omit<CreateUserDto, 'otp'>): Promise<UserLogin> {
    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    const data = await db
      .transaction(async (tx) => {
        // create user
        const [user] = await tx
          .insert(users)
          .values({
            email,
            name,
            password: hashedPassword,
          })
          .returning({
            id: users.id,
            email: users.email,
            name: users.name,
            avatarUrl: users.avatarUrl,
          });

        // create auth token
        const token = await this.createSessionToken(user.id, tx);

        await tx
          .delete(verificationEmails)
          .where(
            eq(verificationEmails.email, email)
          );

        return {
          ...user,
          token,
        };
      })

    return data;
  }

  async login({ email, password }: LoginDto): Promise<UserLogin> {
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        avatarUrl: users.avatarUrl,
        password: users.password,
      })
      .from(users)
      .where(
        eq(users.email, email)
      );

    // verify login credentials
    const matchingPassword = user.password
      ? await bcrypt.compare(password, user.password ?? '')
      : false;
    if (!matchingPassword) {
      throw new UnauthorizedException({
        success: false,
        message: 'Incorrect credentials',
      });
    }
    const {
      password: _hashedPassword,
      ...data
    } = user;

    // create auth token
    const token = await this.createSessionToken(user.id);

    return {
      ...data,
      token,
    };
  }
}
