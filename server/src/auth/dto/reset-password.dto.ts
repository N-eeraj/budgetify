import { IsBoolean, IsOptional, IsString, IsUUID, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'The reset password request id',
    example: '69d979cb-65df-4797-92d1-7cc5a6885197',
  })
  @IsUUID(undefined, {
    message: 'Please send a valid reset password request id',
  })
  readonly requestId!: string;

  @ApiProperty({
    description: 'The reset password token',
    example: '9f2c1a7e4d8b6c3f0a91d5e7b2c4f8a6d9e0b1c3f5a7d8e2c4b6a9f1d3e5c7b8',
  })
  @IsString({
    message: 'Please send the password reset password token',
  })
  readonly token!: string;

  @ApiProperty({
    description: 'The user\'s new password',
    example: 'StrongP@ssw0rd!',
    format: 'password',
  })
  @Matches(/[\W_]/, { message: 'Password must contain at least one special character' })
  @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
  @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @IsString({ message: 'Password must be a string' })
  readonly password!: string;

  @ApiProperty({
    description: 'Flag to logout user from all other devices',
  })
  @IsOptional()
  @IsBoolean({ message: 'Please send a valid boolean' })
  readonly logoutAllDevices!: boolean;
}
