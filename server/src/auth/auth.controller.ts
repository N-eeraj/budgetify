import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService, type UserLogin } from './auth.service';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ApiOperation } from '@nestjs/swagger';

interface UserLoginResponse {
  success: true;
  message: string;
  data: UserLogin;
}

@Controller('auth')
export class AuthController {
  private readonly BYPASS_OTP = process.env.BYPASS_OTP === 'true';

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Send verification email',
    description: 'Generates an OTP and sends a verification email to the user',
  })
  @Post('send-verification')
  @HttpCode(200)
  async sendVerification(@Body() { email }: VerifyEmailDto) {
    await this.authService.ensureUniqueEmail(email);
    if (!this.BYPASS_OTP) {
      await this.authService.ensureVerificationCoolDownComplete(email);
      const otp = await this.authService.generateVerificationOtp(email);
      await this.authService.sendVerificationMail(email, otp);
    }

    return {
      success: true,
      message: 'Send Verification Email',
    };
  }

  @ApiOperation({
    summary: 'Register new user',
    description: 'Creates a new user account after verifying OTP or email',
  })
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserLoginResponse> {
    await this.authService.ensureUniqueEmail(createUserDto.email);
    if (!this.BYPASS_OTP) {
      await this.authService.verifyOtp(createUserDto);
    }
    const data = await this.authService.createUser(createUserDto);

    return {
      success: true,
      message: 'Registration Successful',
      data,
    };
  }

  @ApiOperation({
    summary: 'Login user',
    description: 'Authenticates a user using email and password',
  })
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<UserLoginResponse> {
    const data = await this.authService.login(loginDto);

    return {
      success: true,
      message: 'Login Successful',
      data,
    };
  }

  @ApiOperation({
    summary: 'Forgot Password',
    description: 'Sends an email with a link to reset password',
  })
  @HttpCode(200)
  @Post('forgot-password')
  async requestPasswordReset(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.authService.ensureUserExist(forgotPasswordDto.email);
    await this.authService.ensureNoPasswordResetRequest(user.id);
    const resetPasswordRequest = await this.authService.generatePasswordResetToken(user.id);
    await this.authService.sendPasswordResetTokenMail(user.email, resetPasswordRequest);

    return {
      success: true,
      message: 'Reset password email has been sent',
    };
  }
}
