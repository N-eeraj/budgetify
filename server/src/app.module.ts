import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
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
