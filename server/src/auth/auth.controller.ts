import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService, type UserLogin } from './auth.service';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { CreateUserDto } from './dto/create-user.dto';

interface UserLoginResponse {
  success: true;
  message: string;
  data: UserLogin;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-verification')
  @HttpCode(200)
  async sendVerification(@Body() verifyEmailDto: VerifyEmailDto) {
    await this.authService.ensureUniqueEmail(verifyEmailDto.email);
    await this.authService.sendVerificationMail(verifyEmailDto.email);
    return {
      success: true,
      message: 'Send verification email',
    };
  }
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserLoginResponse> {
    await this.authService.ensureUniqueEmail(createUserDto.email);
    await this.authService.verifyOtp(createUserDto);
    const data = await this.authService.createUser(createUserDto);
    return {
      success: true,
      message: 'Registration Successful',
      data,
    };
  }
}
