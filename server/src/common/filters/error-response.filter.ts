import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, NotFoundException } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { ValidationError } from 'class-validator';
import type { Request, Response } from 'express';

type ExceptionHandler = (
  exception: HttpException,
  req: Request,
  res: Response,
) => Record<string, any>;

@Catch()
export class ErrorResponseFilter implements ExceptionFilter {
  private readonly handlers = new Map<Function, ExceptionHandler>([
    [ThrottlerException, this.throttleHandler.bind(this)],
    [NotFoundException, this.notFoundHandler.bind(this)],
    [BadRequestException, this.badRequestHandler.bind(this)],
  ]);

  private badRequestHandler(exception: BadRequestException) {
    const response = exception.getResponse() as {
      type?: string;
      errors?: ValidationError[];
      message?: string;
    };

    // Validation errors
    if (response.type === 'validation' && response.errors) {
      const formattedErrors = response.errors.reduce(
        (acc, error) => {
          acc[error.property] = Object.values(error.constraints ?? {});
          return acc;
        },
        {} as Record<string, string[]>,
      );

      return {
        message: 'Bad Request',
        errors: formattedErrors,
      };
    }

    // Generic bad request
    return {
      message: response.message || 'Bad Request',
      errors: response.errors,
    };
  }

  private notFoundHandler(exception: NotFoundException, req: Request) {
    const exceptionResponse = exception.getResponse();

    let response: Record<string, any> = typeof exceptionResponse === 'string'
      ? {}
      : exceptionResponse;

    if ('error' in response && response.error === 'Not Found') {
      response = {
        message: 'Route not found',
        path: req.originalUrl,
      };
    }

    return response;
  }

  private throttleHandler() {
    return {
      message: 'Too many requests! Please try again later',
    };
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const status = exception.getStatus();

    let response = exception.getResponse() as object;

    const handler = this.handlers.get(exception.constructor);
    if (handler) {
      response = handler(exception, req, res);
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
