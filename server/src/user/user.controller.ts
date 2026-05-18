import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@Req() request: Request) {
    if ('user' in request) {
      return {
        success: true,
        data: request.user,
        message: 'User Fetched Successfully',
      };
    }
  }
}
