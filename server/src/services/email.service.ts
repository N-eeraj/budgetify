import { Injectable } from '@nestjs/common';
import { MailtrapClient } from 'mailtrap';

if (!process.env.MAILTRAP_API_TOKEN) throw new Error('Missing env variable: MAILTRAP_API_TOKEN');

const client = new MailtrapClient({
  token: process.env.MAILTRAP_API_TOKEN,
});

interface EmailOptions {
  recipients: Array<{ email: string }>;
  category: string;
  subject: string;
  body: {
    type: "html" | "text";
    content: string;
  };
};

@Injectable()
export class EmailService {
  private readonly sender = {
    email: process.env.MAILTRAP_SENDER_MAIL ?? '',
    name: 'Budgetify',
  } as const;

  async sendMail({
    recipients,
    category,
    subject,
    body,
  }: EmailOptions) {
    await client
      .send({
        from: this.sender,
        to: recipients,
        subject,
        [body.type]: body.content,
        category,
      });
  }
}
