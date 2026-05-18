import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch()
export class ErrorResponseFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    let response = exception.getResponse() as object;
    const status = exception.getStatus();

    // handle route not found error response
    if ('error' in response && response.error === 'Not Found') {
      response = {
        message: 'Route not found',
        path: req.originalUrl,
      };
    }

    return res
      .status(status)
      .json({
        ...response,
        success: false,
        message: 'message' in response ? response.message : 'Oops! Something Went Wrong',
      });
  }
}
