import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
    format: 'email',
  })
  @IsEmail({}, {
    message: 'Please enter a valid email',
  })
  readonly email!: string;

  @ApiProperty({
    description: 'The user\'s password',
    example: 'StrongP@ssw0rd!',
    format: 'password',
  })
  @IsString({ message: 'Password must be a string' })
  readonly password!: string;
}
