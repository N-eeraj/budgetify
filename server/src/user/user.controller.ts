import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import type { SuccessResponse, User } from 'src/types/global';
import type { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@Req() request: Request): SuccessResponse<User> {
    return {
      success: true,
      data: request.user,
      message: 'User Fetched Successfully',
    };
  }
}
