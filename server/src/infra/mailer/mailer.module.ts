import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
import { join } from 'path';

const TEMPLATE_DIR = join(process.cwd(), 'dist', 'assets', 'email-templates');

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      template: {
        dir: TEMPLATE_DIR,
        adapter: new HandlebarsAdapter(),
      },
    }),
  ],
})
export class InfraMailerModule {}
