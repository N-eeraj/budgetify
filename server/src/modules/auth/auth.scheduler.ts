import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { lte } from 'drizzle-orm';
import { db } from 'src/db/index.drizzle';
import { authTokens, resetPasswordTokens, verificationEmails } from 'src/db/schemas/index.drizzle';

@Injectable()
export class AuthScheduler {
  private readonly logger = new Logger(AuthScheduler.name);

  @Cron(CronExpression.EVERY_10_MINUTES)
  async runTasks() {
    this.logger.log('Auth scheduler started');

    await Promise.allSettled([
      this.clearExpiredEmailVerification(),
      this.clearExpiredPasswordReset(),
      this.clearExpiredAuthTokens(),
    ]);

    this.logger.log('Auth scheduler completed');
  }

  private async clearExpiredEmailVerification() {
    this.logger.log('Clearing expired email verification');

    try {
      await db
        .delete(verificationEmails)
        .where(lte(verificationEmails.expiresAt, new Date()));

      this.logger.log('Cleared expired email verification');
    } catch (error) {
      this.logger.error('Failed to clear expired email verification', error);
    }
  }

  private async clearExpiredPasswordReset() {
    this.logger.log('Clearing expired password reset');

    try {
      await db
        .delete(resetPasswordTokens)
        .where(lte(resetPasswordTokens.expiresAt, new Date()));

      this.logger.log('Cleared expired password reset');
    } catch (error) {
      this.logger.error('Failed to clear expired password reset', error);
    }
  }

  private async clearExpiredAuthTokens() {
    this.logger.log('Clearing expired auth tokens');

    try {
      await db
        .delete(authTokens)
        .where(lte(authTokens.expiresAt, new Date()));

      this.logger.log('Cleared expired password reset');
    } catch (error) {
      this.logger.error('Failed to clear expired password reset', error);
    }
  }
}
