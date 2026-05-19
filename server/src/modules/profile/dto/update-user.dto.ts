import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
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
}
