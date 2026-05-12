import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'The unique email address of the user',
    example: 'user@example.com',
    required: true,
    format: 'email',
  })
  @IsEmail()
  readonly email!: string;
}
