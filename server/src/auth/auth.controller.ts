import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService, type UserLogin } from './auth.service';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation } from '@nestjs/swagger';

interface UserLoginResponse {
  success: true;
  message: string;
  data: UserLogin;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Send verification email',
    description: 'Generates an OTP and sends a verification email to the user',
  })
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

  @ApiOperation({
    summary: 'Register new user',
    description: 'Creates a new user account after verifying OTP or email',
  })
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
