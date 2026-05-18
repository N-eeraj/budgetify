import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db/index.drizzle';
import { authTokens, users } from 'src/db/schemas/index.drizzle';
import crypto from 'crypto';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;
    const token = authorizationHeader?.replace(/^Bearer\s/, '');
    if (!token) {
      throw new UnauthorizedException({
        success: false,
        message: 'Invalid Authentication Token',
      });
    }

    const hashedToken = crypto
      .createHmac('sha256', process.env.TOKEN_SECRET!)
      .update(token)
      .digest('hex');

    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        avatarUrl: users.avatarUrl,
      })
      .from(authTokens)
      .leftJoin(users, eq(
        users.id, authTokens.userId
      ))
      .where(
        eq(authTokens.token, hashedToken)
      );
    if (!user) {
      throw new UnauthorizedException({
        success: false,
        message: 'Invalid Authentication Token',
      });
    }

    request.user = user;
    request.token = token;

    return true;
  }
}
