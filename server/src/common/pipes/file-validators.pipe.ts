import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

export interface FileValidationOptions {
  required?: boolean;
  maxSize?: number;
  mimeTypes?: Array<string | RegExp>;
}

interface CustomError {
  message?: string;
  errors?: any;
}

export interface FileValidationErrors {
  required?: CustomError
  maxSize?: CustomError
  mimeTypes?: CustomError
}

@Injectable()
export class FileValidatorsPipe implements PipeTransform {
  constructor(
    private readonly options: FileValidationOptions,
    private readonly errors?: FileValidationErrors,
  ) {
    if (options.required === undefined) {
      this.options.required = true;
    }
  }

  transform(file: Express.Multer.File) {
    if (
      this.options.required
      && !file
    ) {
      throw new BadRequestException({
        errors: this.errors?.required?.errors,
        message: this.errors?.required?.message || 'File not selected',
      });
    }

    if (!file) return file;

    if (
      this.options.maxSize
      && file.size > this.options.maxSize
    ) {
      throw new BadRequestException({
        errors: this.errors?.maxSize?.errors,
        message: this.errors?.maxSize?.message || 'File too large',
      });
    }

    if (this.options.mimeTypes?.length) {
      const isValid = this.options.mimeTypes.some((type) => {
        if (type instanceof RegExp) {
          return type.test(file.mimetype);
        }
        return type === file.mimetype;
      });

      if (!isValid) {
        throw new BadRequestException({
          errors: this.errors?.mimeTypes?.errors,
          message: this.errors?.mimeTypes?.message || 'Invalid file type',
        });
      }
    }

    return file;
  }
}
