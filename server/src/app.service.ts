import { Injectable } from '@nestjs/common';
import { SuccessResponse } from './types/global';

export type HealthResponse = SuccessResponse<{
  status: 'ok';
  timestamp: Date;
}>;

@Injectable()
export class AppService {
  getHealth(): HealthResponse {
    return {
      success: true,
      message: 'Budgetify API is running',
      data: {
        status: 'ok',
        timestamp: new Date,
      }
    };
  }
}
