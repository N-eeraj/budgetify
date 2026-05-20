import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { InfraMailerModule as MailerModule } from './infra/mailer/mailer.module';
import { InfraStaticModule as ServeStaticModule } from './infra/static/static.module';
import { InfraThrottlerModule as ThrottlerModule } from './infra/throttler/throttler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ServeStaticModule,
    MailerModule,
    ThrottlerModule,

    AuthModule,
    ProfileModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
