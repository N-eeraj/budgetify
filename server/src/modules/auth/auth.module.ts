import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthScheduler } from './auth.scheduler';

@Module({
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    AuthScheduler,
  ],
})
export class AuthModule {}
