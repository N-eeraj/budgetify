import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    const exceptionResponse = exception.getResponse();
    let response: Record<string, any> = typeof exceptionResponse === 'string'
      ? { success: false }
      : { success: false, ...exceptionResponse };

    if ('error' in response && response.error === 'Not Found') {
      response = {
        success: false,
        message: 'Route not found',
        path: req.originalUrl,
      };
    }

    res.status(404).json(response);
  }
}
