import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundFilter } from './common/filters/not-found.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { BadRequestFilter } from './common/filters/bad-request.filter';
import { ErrorResponseFilter } from './common/filters/error-response.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // API documentation
  const config = new DocumentBuilder()
    .setTitle('Budgetify API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use(
    '/docs',
    apiReference({
      content: document,
    }),
  );

  // validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors) {
        return new BadRequestException({
          type: 'validation',
          errors,
        });
      },
    }),
  );

  // filters
  app.useGlobalFilters(new NotFoundFilter());
  app.useGlobalFilters(new BadRequestFilter());
  app.useGlobalFilters(new ErrorResponseFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
