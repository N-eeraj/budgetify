import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmailService } from './services/email.service';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
    AuthModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    EmailService,
  ],
})
export class AppModule {}
