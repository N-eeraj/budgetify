import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/types/global';
import { db } from 'src/db/index.drizzle';
import { users } from 'src/db/schemas/index.drizzle';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProfileService {
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
}
