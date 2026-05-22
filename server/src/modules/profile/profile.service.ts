import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User, UserSession } from 'src/types/global';
import { db } from 'src/db/index.drizzle';
import { authTokens, users } from 'src/db/schemas/index.drizzle';
import { and, eq, ne } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Bucket, StorageService } from 'src/infra/storage/storage.service';

@Injectable()
export class ProfileService {
  private readonly SALT_ROUNDS = 12;
  private readonly PROFILE_PICTURE_BUCKET = Bucket.PRIVATE;
  private readonly PROFILE_PICTURE_BASE_PATH = 'profile-pictures';

  constructor (private readonly storageService: StorageService) {}

  async getProfilePicture(path: string): Promise<string> {
    const signedUrl = await this.storageService.getSignedUrl(this.PROFILE_PICTURE_BUCKET, path);
    return signedUrl;
  }

  async updateUser(userId: User['id'], { name }: UpdateUserDto) {
    const result = await db
      .update(users)
      .set({
        name,
      })
      .where(
        eq(users.id, userId)
      );
    if (!result.rowCount) {
      throw new NotFoundException({
        message: 'User not found',
      });
    }
  }

  async updatePassword(
    userId: User['id'],
    { password, newPassword, logoutAllDevices }: UpdatePasswordDto,
    token: UserSession['token']
  ) {
    await db
      .transaction(async (tx) => {
        const [user] = await tx
          .select({
            hashedCurrentPassword: users.password,
          })
          .from(users)
          .where(
            eq(users.id, userId)
          );

          // verify user exists
          if (!user) {
            throw new NotFoundException({
              message: 'User not found',
            });
          }

          // check if password is correct
          const matchingPassword = await bcrypt.compare(password, user.hashedCurrentPassword);
          if (!matchingPassword) {
            throw new BadRequestException({
              message: 'Incorrect Password',
              password: [
                'Incorrect password',
              ],
            })
          }

          // update password
          const hashedPassword = await bcrypt.hash(newPassword, this.SALT_ROUNDS);
          await tx
            .update(users)
            .set({
              password: hashedPassword,
            })
            .where(
              eq(users.id, userId)
            );
            
          // clear auth tokens
          if (logoutAllDevices) {
            const hashedToken = crypto
              .createHmac('sha256', process.env.TOKEN_SECRET!)
              .update(token)
              .digest('hex');

            await tx
              .delete(authTokens)
              .where(
                and(
                  eq(authTokens.userId, userId),
                  ne(authTokens.token, hashedToken)
                )
              );
          }
      });
  }

  async updateProfilePicture(userId: User['id'], picture: Express.Multer.File): Promise<string> {
    const fileName = `${userId}${Date.now()}`;
    const filePath = `${this.PROFILE_PICTURE_BASE_PATH}/${fileName}`;

    const profilePictureUrl = await db
        .transaction(async (tx) => {
        // upload file
        const newAvatarUrl = await this.storageService.uploadFile(
          this.PROFILE_PICTURE_BUCKET,
          filePath,
          picture,
        );

        // find current profile picture URL
        const [{ currentAvatarUrl }] = await tx
          .select({
            currentAvatarUrl: users.avatarUrl,
          })
          .from(users)
          .where(
            eq(users.id, userId)
          );

        // remove current profile picture file
        if (currentAvatarUrl) {
          await this.storageService.deleteFile(this.PROFILE_PICTURE_BUCKET, currentAvatarUrl);
        }

        // update database with new profile picture URL
        await tx
          .update(users)
          .set({
            avatarUrl: newAvatarUrl,
          })
          .where(
            eq(users.id, userId)
          );
    
        // create and return a signed URL
        const signedUrl = await this.getProfilePicture(newAvatarUrl);
        return signedUrl;
      });

    return profilePictureUrl;
  }

  async deleteProfilePicture(userId: User['id']) {
    await db
      .transaction(async (tx) => {
        // find current profile picture URL
        const [{ currentAvatarUrl }] = await tx
          .select({
            currentAvatarUrl: users.avatarUrl,
          })
          .from(users)
          .where(
            eq(users.id, userId)
          );

        // remove current profile picture file
        if (!currentAvatarUrl) return;
        await this.storageService.deleteFile(this.PROFILE_PICTURE_BUCKET, currentAvatarUrl);

        // remove profile picture URL
        await tx
          .update(users)
          .set({
            avatarUrl: null,
          })
          .where(
            eq(users.id, userId)
          );
      });
  }
}
