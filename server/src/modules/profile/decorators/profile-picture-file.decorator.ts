import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FileValidatorsPipe } from 'src/common/pipes/file-validators.pipe';

export const ProfilePictureFile = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const file = request.file as Express.Multer.File;

    const pipe = new FileValidatorsPipe(
      {
        maxSize: 10_48_576, // 1 MB
        mimeTypes: [
          /^image\/.*$/,
        ],
      },
      {
        required: {
          errors: {
            file: [
              'Please select a file',
            ],
          },
        },
        maxSize: {
          errors: {
            file: [
              'Please select a file less than 1 MB',
            ],
          },
        },
        mimeTypes: {
          errors: {
            file: [
              'Please select an image file',
            ],
          },
        },
      },
    );

    return pipe.transform(file);
  },
);
