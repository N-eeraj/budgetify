import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): object {
    return {
      success: true,
      message: 'Budgetify API is running',
      data: {
        status: 'ok',
        timestamp: Date.now(),
      }
    };
  }
}
