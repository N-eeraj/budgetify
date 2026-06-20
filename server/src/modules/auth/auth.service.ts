import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { and, eq, gt, type ExtractTablesWithRelations } from 'drizzle-orm';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import { db } from 'src/db/index.drizzle';
import { authTokens, resetPasswordTokens, users, verificationEmails } from 'src/db/schemas/index.drizzle';
import { MailerService } from '@nestjs-modules/mailer';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import type { User, UserSession } from 'src/types/global';

interface PasswordResetRequest {
  uuid: string;
  token: string;
}

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 12;
  private readonly EMAIL_OTP_VALIDITY = 9_00_000; // 15 minutes in ms
  private readonly EMAIL_OTP_RETRY = 3_00_000; // 5 minutes in ms
  private readonly RESET_PASSWORD_TOKEN_VALIDITY = 36_00_000; // 1 hour in ms
  private readonly RESET_PASSWORD_URL = 'reset-password';
  private readonly AUTH_TOKEN_LIFE = 8_64_00_000; // 1 day in ms

  constructor(private readonly mailerService: MailerService) {}

  async getUserByEmail(email: User['email']): Promise<Pick<User, 'id' | 'email'> | undefined> {
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
      })
      .from(users)
      .where(
        eq(users.email, email)
      );

    return user;
  }

  async ensureUniqueEmail(email: User['email']) {
    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      throw new ConflictException({
        message: 'Account already exists, please login',
        errors: {
          email: [
            'Email is already in use',
          ],
        },
      });
    }
  }

  async ensureVerificationCoolDownComplete(email: User['email']) {
    const [existingEntry] = await db
      .select({
        updatedAt: verificationEmails.updatedAt,
      })
      .from(verificationEmails)
      .where(
        eq(verificationEmails.email, email)
      );

    // check if the retry cool-down period has elapsed
    if (existingEntry?.updatedAt) {
      const retryTime = new Date(existingEntry.updatedAt.getTime() + this.EMAIL_OTP_RETRY);
      const now = new Date();
      const secondsRemaining = Math.floor((retryTime.getTime() - now.getTime()) / 1_000);
      if (secondsRemaining > 0) {
        throw new BadRequestException({
          message: 'Please wait before requesting another OTP',
          errors: {
            retryIn: secondsRemaining,
          },
        });
      }
    }
  }

  async generateVerificationOtp(email: User['email']): Promise<string> {
    // generates OTP, expires at and read HTML email template
    const otp = crypto.randomInt(0, 999_999)
      .toString()
      .padStart(6, '0');

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

    return otp;
  }

  async sendVerificationMail(email: User['email'], otp: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Email Verification',
      template: 'email-verification',
      context: {
        otp,
      },
    });
  }

  async verifyOtp({ email, otp }: Pick<CreateUserDto, 'email' | 'otp'>) {
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
        message: 'Please request a verification a new code',
      });
    }

    // check if otp matches
    const matchingOtp = await bcrypt.compare(otp, verificationRecord.otp);
    if (!matchingOtp) {
      throw new UnauthorizedException({
        message: 'Incorrect OTP',
        errors: {
          otp: [
            'Incorrect OTP',
          ],
        },
      });
    }
  }

  async createSessionToken(
    userId: number,
    tx?: PgTransaction<NodePgQueryResultHKT, Record<string, never>, ExtractTablesWithRelations<Record<string, never>>>
  ): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHmac('sha256', process.env.TOKEN_SECRET!)
      .update(token)
      .digest('hex');

    const expiresAt = new Date(Date.now() + this.AUTH_TOKEN_LIFE);
    await (tx ?? db)
      .insert(authTokens)
      .values({
        token: hashedToken,
        userId,
        expiresAt,
      });

    return token;
  }

  async createUser({ email, name, password }: Omit<CreateUserDto, 'otp'>): Promise<UserSession> {
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

        // delete email verification record
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

  async login({ email, password }: LoginDto): Promise<UserSession> {
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
    const matchingPassword = user
      ? await bcrypt.compare(password, user.password ?? '')
      : false;
    if (!matchingPassword) {
      throw new UnauthorizedException({
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

  async ensureUserExist(email: User['email']): Promise<Pick<User, 'id' | 'email'>> {
    const user = await this.getUserByEmail(email);

    // ensure user exists
    if (!user) {
      throw new BadRequestException({
        message: 'Unable to process the request',
      });
    }

    return user;
  }

  async ensureNoPasswordResetRequest(userId: User['id']) {
    const [existingRequest] = await db
      .select({
        expiresAt: resetPasswordTokens.expiresAt,
      })
      .from(resetPasswordTokens)
      .where(
        and(
          eq(resetPasswordTokens.userId, userId),
          gt(resetPasswordTokens.expiresAt, new Date()),
        )
      );

    if (existingRequest) {
      const secondsRemaining = Math.floor((existingRequest.expiresAt.getTime() - Date.now()) / 1_000);
      throw new BadRequestException({
        message: 'Request already sent, please try again later',
        errors: {
          retryIn: secondsRemaining,
        }
      });
    }
  }

  async generatePasswordResetToken(userId: User['id']): Promise<PasswordResetRequest> {
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(token, this.SALT_ROUNDS);

    const expiresAt = new Date(Date.now() + this.RESET_PASSWORD_TOKEN_VALIDITY);

    const [resetPasswordRequest] = await db
      .insert(resetPasswordTokens)
      .values({
        userId,
        token: hashedToken,
        expiresAt,
      })
      .returning({
        id: resetPasswordTokens.id,
      });

    return {
      uuid: resetPasswordRequest.id,
      token,
    };
  }

  async sendPasswordResetTokenMail(email: User['email'], { uuid, token }: PasswordResetRequest) {
    const resetPasswordUrl = `${process.env.CLIENT_URL}/${this.RESET_PASSWORD_URL}/${token}?id=${uuid}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Email Verification',
      template: 'reset-password',
      context: {
        resetPasswordUrl,
      },
    });
  }

  async verifyPasswordResetToken({ uuid, token }: PasswordResetRequest): Promise<User['id']> {
    const [passwordResetRequest] = await db
      .select({
        userId: resetPasswordTokens.userId,
        hashedToken: resetPasswordTokens.token,
      })
      .from(resetPasswordTokens)
      .where(
        and(
          eq(resetPasswordTokens.id, uuid),
          gt(resetPasswordTokens.expiresAt, new Date()),
        )
      );

    // verify token
    const isMatchingToken = passwordResetRequest
      ? await bcrypt.compare(token, passwordResetRequest.hashedToken ?? '')
      : false;

    if (!isMatchingToken) {
      throw new NotFoundException({
        message: 'Password reset token not found',
        errors: {
          token: 'Invalid password reset token',
        },
      });
    }

    return passwordResetRequest.userId;
  }

  async updateUserPassword(
    userId: User['id'],
    password: string,
    uuid: PasswordResetRequest['uuid'],
    logoutAllDevices?: boolean
  ) {
    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);

    await db
      .transaction(async (tx) => {
        // update password
        await tx
          .update(users)
          .set({
            password: hashedPassword,
          })
          .where(
            eq(users.id, userId)
          );

        // delete reset request
        await tx
          .delete(resetPasswordTokens)
          .where(
            eq(resetPasswordTokens.id, uuid)
          );

        // clear auth tokens
        if (logoutAllDevices) {
          await tx
            .delete(authTokens)
            .where(
              eq(authTokens.userId, userId)
            );
        }
      });
  }
}
