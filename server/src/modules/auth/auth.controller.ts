import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ApiOperation } from '@nestjs/swagger';
import type { SuccessResponse, UserSession } from 'src/types/global';

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
  async sendVerification(@Body() { email }: VerifyEmailDto): Promise<SuccessResponse> {
    await this.authService.ensureUniqueEmail(email);
    if (!this.BYPASS_OTP) {
      await this.authService.ensureVerificationCoolDownComplete(email);
      const otp = await this.authService.generateVerificationOtp(email);
      await this.authService.sendVerificationMail(email, otp);
    }

    return {
      success: true,
      message: 'Sent Verification Email',
    };
  }

  @ApiOperation({
    summary: 'Register new user',
    description: 'Creates a new user account after verifying OTP or email',
  })
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<SuccessResponse<UserSession>> {
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
  async login(@Body() loginDto: LoginDto): Promise<SuccessResponse<UserSession>> {
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
  async requestPasswordReset(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<SuccessResponse> {
    const user = await this.authService.ensureUserExist(forgotPasswordDto.email);
    await this.authService.ensureNoPasswordResetRequest(user.id);
    const resetPasswordRequest = await this.authService.generatePasswordResetToken(user.id);
    await this.authService.sendPasswordResetTokenMail(user.email, resetPasswordRequest);

    return {
      success: true,
      message: 'Reset password email has been sent',
    };
  }

  @ApiOperation({
    summary: 'Reset Password',
    description: 'Resets the user\'s password',
  })
  @HttpCode(200)
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<SuccessResponse> {
    const userId = await this.authService.verifyPasswordResetToken({
      uuid: resetPasswordDto.requestId,
      token: resetPasswordDto.token,
    });
    await this.authService.updateUserPassword(
      userId,
      resetPasswordDto.password,
      resetPasswordDto.requestId,
      resetPasswordDto.logoutAllDevices
    );

    return {
      success: true,
      message: 'Successfully updated password',
    };
  }
}
