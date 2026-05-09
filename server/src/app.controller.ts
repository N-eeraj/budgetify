import { All, Controller, Get, NotFoundException, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth(): ReturnType<typeof this.appService.getHealth> {
    return this.appService.getHealth();
  }
}
