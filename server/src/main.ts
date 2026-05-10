import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundFilter } from './filters/not-found.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { ValidationPipe } from '@nestjs/common';

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

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new NotFoundFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
