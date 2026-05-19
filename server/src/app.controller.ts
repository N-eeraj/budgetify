import { Controller, Get } from '@nestjs/common';
import { AppService, HealthResponse } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import type { SuccessResponse } from './types/global';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Health check',
    description: 'Checks if the API and its dependencies are running correctly',
  })
  @Get('health')
  getHealth(): SuccessResponse<HealthResponse['data']> {
    return this.appService.getHealth();
  }
}
