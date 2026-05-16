import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Health check',
    description: 'Checks if the API and its dependencies are running correctly',
  })
  @Get('health')
  getHealth(): ReturnType<typeof this.appService.getHealth> {
    return this.appService.getHealth();
  }
}
