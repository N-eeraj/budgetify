import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db/index.drizzle';
import { users, verificationEmails } from 'src/db/schemas/index.drizzle';
import { EmailService } from 'src/services/email.service';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 12;
  private readonly EMAIL_OTP_VALIDITY = 9_00_000; // 15 minutes in seconds
  private readonly BYPASS_OTP = process.env.BYPASS_OTP === 'true';

  constructor(private readonly emailService: EmailService) {}

  async enureUserExists(email: string): Promise<boolean> {
    const existingUser = await db
      .select({
        id: users.id,
      })
      .from(users)
      .where(
        eq(users.email, email)
      );
    return Boolean(existingUser.length)
  }

  async sendVerificationMail(email: string) {
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

    if (this.BYPASS_OTP) return;
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

  
}
