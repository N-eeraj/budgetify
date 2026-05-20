import { IsBoolean, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'The user\'s password',
    example: 'StrongP@ssw0rd!',
    format: 'password',
  })
  @IsString({ message: 'Password must be a string' })
  readonly password!: string;

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
  readonly newPassword!: string;

  @ApiProperty({
    description: 'Flag to logout user from all other devices',
  })
  @IsOptional()
  @IsBoolean({ message: 'Please send a valid boolean' })
  readonly logoutAllDevices?: boolean;
}
