import { BadRequestException, Body, Controller, Get, Patch, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import type { SuccessResponse, User } from 'src/types/global';
import type { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfilePictureFile } from './decorators/profile-picture-file.decorator';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth('bearer')
@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    summary: 'Get user profile',
    description: 'Retrieves the authenticated user profile information',
  })
  @Get()
  async getUser(@Req() request: Request): Promise<SuccessResponse<User>> {
    const user = request.user;
    if (user.avatarUrl) {
      user.avatarUrl = await this.profileService.getProfilePicture(user.avatarUrl);
    }

    return {
      success: true,
      data: user,
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

  @ApiOperation({
    summary: 'Update user password',
    description: 'Updates the user password after verifying the current password',
  })
  @Patch('password')
  async updatePassword(
    @Req() request: Request,
    @Body() updatePasswordDto: UpdatePasswordDto
  ): Promise<SuccessResponse> {
    if (updatePasswordDto.password === updatePasswordDto.newPassword) {
      throw new BadRequestException({
        message: 'Please enter a different new password',
        errors: {
          newPassword: [
            'New password can\'t be same as current password',
          ],
        }
      });
    }

    const userId = request.user.id;
    const token = request.token;
    await this.profileService.updatePassword(userId, updatePasswordDto, token);

    return {
      success: true,
      message: 'Updated Password Successfully',
    };
  }

  @ApiOperation({
    summary: 'Update profile picture',
    description: 'Updates the user profile picture',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image to be used as the profile picture',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Put('picture')
  async updateProfilePicture(
    @Req() request,
    @ProfilePictureFile() picture: Express.Multer.File
  ): Promise<SuccessResponse<{ url: string }>> {
    const userId = request.user.id;
    const url = await this.profileService.updateProfilePicture(userId, picture);

    return {
      success: true,
      message: 'Updated Profile Picture',
      data: {
        url,
      }
    };
  }
}
