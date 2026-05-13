import { IsString, MinLength, MaxLength, Length, IsEmail, IsStrongPassword, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User\'s full name',
    example: 'John Doe',
  })
  @MaxLength(50, {
    message: 'Please enter at most $constraint1 characters',
  })
  @MinLength(2, {
    message: 'Please enter at least $constraint1 characters',
  })
  @IsString({
    message: 'Please enter a valid user name',
  })
  readonly name!: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
    format: 'email',
  })
  @IsEmail({}, {
    message: "Please enter a valid email",
  })
  readonly email!: string;

  @ApiProperty({
    description: 'The OTP sent to user\'s email',
    example: '123456',
  })
  @Length(6, 6, {
    message: 'Please enter the $constraint1 digit OTP',
  })
  @IsString({
    message: 'Please enter the OTP',
  })
  readonly otp!: string;

  @ApiProperty({
    description: 'The user\'s password',
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
}
