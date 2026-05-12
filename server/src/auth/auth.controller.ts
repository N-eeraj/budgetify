import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-verification')
  @HttpCode(200)
  async sendVerification(@Body() verifyEmailDto: VerifyEmailDto) {
    await this.authService.sendVerificationMail(verifyEmailDto.email);
    return {
      success: true,
      message: 'Send verification email',
    };
  }
}
