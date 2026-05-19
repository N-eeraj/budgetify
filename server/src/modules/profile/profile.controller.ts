import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import type { SuccessResponse, User } from 'src/types/global';
import type { Request } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    summary: 'Get user profile',
    description: 'Retrieves the authenticated user profile information',
  })
  @Get()
  getUser(@Req() request: Request): SuccessResponse<User> {
    return {
      success: true,
      data: request.user,
      message: 'User Fetched Successfully',
    };
  }

  @ApiOperation({
    summary: 'Update user profile',
    description: 'Updates the authenticated user name and email',
  })
  @Patch()
  async updateUser(
    @Req() request: Request,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<SuccessResponse> {
    const userId = request.user.id;
    await this.profileService.updateUser(userId, updateUserDto);

    return {
      success: true,
      message: 'Updated User Successfully',
    };
  }
}
