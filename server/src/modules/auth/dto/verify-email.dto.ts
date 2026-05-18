import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'The unique email address of the user',
    example: 'user@example.com',
    format: 'email',
  })
  @IsEmail({}, {
    message: 'Please enter a valid email',
  })
  readonly email!: string;
}
