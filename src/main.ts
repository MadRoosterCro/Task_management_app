import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);


  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle(process.env.API_TITLE)
    .setDescription(process.env.API_DESCRIPTION)
    .setVersion(process.env.API_VERSION)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.API_DOCUMENTATION_PATH, app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();

  await app.listen(process.env.PORT);
  logger.log(`Application listening on port ${process.env.PORT}!`);
}
bootstrap();
