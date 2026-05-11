import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
  catch(_exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    res.status(404).json({
      success: false,
      message: 'Route not found',
      path: req.originalUrl,
    });
  }
}
