import { Body, ConflictException, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-verification')
  @HttpCode(200)
  async sendVerification(@Body() verifyEmailDto: VerifyEmailDto) {
    const isEmailTaken = await this.authService.enureUserExists(verifyEmailDto.email);
    if (isEmailTaken) {
      throw new ConflictException({
        success: false,
        message: 'Account already exists, please login',
        errors: {
          email: [
            'Email is already in use',
          ],
        },
      });
    }

    await this.authService.sendVerificationMail(verifyEmailDto.email);
    return {
      success: true,
      message: 'Send verification email',
    };
  }
}
