import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User, UserSession } from 'src/types/global';
import { db } from 'src/db/index.drizzle';
import { authTokens, users } from 'src/db/schemas/index.drizzle';
import { and, eq, ne } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

@Injectable()
export class ProfileService {
  private readonly SALT_ROUNDS = 12;

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
}
