
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AuthScheduler {
  @Cron(CronExpression.EVERY_10_MINUTES)
  async runTasks() {
    await Promise.all([
      this.clearExpiredEmailVerification(),
      this.clearExpiredPasswordReset(),
    ]);
  }

  private async clearExpiredEmailVerification() {
    console.log("clearExpiredEmailVerification")
  }

  private async clearExpiredPasswordReset() {
    console.log("clearExpiredPasswordReset")
  }
}