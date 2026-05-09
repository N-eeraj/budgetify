import { All, Controller, Get, NotFoundException, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth(): ReturnType<typeof this.appService.getHealth> {
    return this.appService.getHealth();
  }

  @All('*')
  handle404(@Req() req) {
    throw new NotFoundException('Route not found', {
      description: `Could not find path: ${req.originalUrl}`,
    })
  }
}
