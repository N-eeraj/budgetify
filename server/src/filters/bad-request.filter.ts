import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

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

      return res.status(400).json({
        success: false,
        message: 'Bad Request',
        errors: formattedErrors,
      });
    }

    // Generic bad request
    return res.status(400).json({
      success: false,
      message: response.message || 'Bad Request',
      errors: response.errors,
    });
  }
}
