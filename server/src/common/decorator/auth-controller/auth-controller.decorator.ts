import { applyDecorators, Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

/**
 * Composite controller decorator for authenticated routes.
 *
 * Applies:
 * - `@ApiBearerAuth('bearer')`
 * - `@UseGuards(AuthGuard)`
 * - `@Controller(path)`
 *
 * Use this decorator for controllers that require bearer token authentication.
 *
 * @param path - Route prefix for the controller.
 */
export function AuthController(path = ''): ClassDecorator {
  return applyDecorators(
    ApiBearerAuth('bearer'),
    UseGuards(AuthGuard),
    Controller(path),
  );
}
