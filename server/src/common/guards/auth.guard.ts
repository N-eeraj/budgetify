import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { eq, and, gt } from 'drizzle-orm';
import { db } from 'src/db/index.drizzle';
import { authTokens, users } from 'src/db/schemas/index.drizzle';
import crypto from 'crypto';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.replace(/^Bearer\s/, '');
    if (!token) {
      throw new UnauthorizedException({
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
      .leftJoin(users, eq(users.id, authTokens.userId))
      .where(
        and(
          eq(authTokens.token, hashedToken),
          gt(authTokens.expiresAt, new Date()),
        )
      );
    if (!user) {
      throw new UnauthorizedException({
        message: 'Invalid Authentication Token',
      });
    }

    req.user = user;
    req.token = token;
    req.hashedToken = hashedToken;

    return true;
  }
}
