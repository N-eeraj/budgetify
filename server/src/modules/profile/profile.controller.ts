import { BadRequestException, Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Patch, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import type { SuccessResponse, User } from 'src/types/global';
import type { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';

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
  @UseInterceptors(FileInterceptor('file'))
  @Put('picture')
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
  async updateProfilePicture(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 10_48_576, // 1MB
            errorMessage: 'Please select a file smaller than 1 MB',
          }),
          new FileTypeValidator({
            fileType: 'image/*',
            errorMessage: 'Please select an image file',
          }),
        ],
      }),
    ) file: Express.Multer.File
  ): Promise<SuccessResponse<any>> {
    console.log(file)

    return {
      success: true,
      message: 'Updated Profile Picture',
    };
  }
}
