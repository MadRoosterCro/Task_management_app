import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle(configService.get('API_TITLE'))
    .setDescription(configService.get('API_DESCRIPTION'))
    .setVersion(configService.get('API_VERSION'))
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    configService.get('API_DOCUMENTATION_PATH'),
    app,
    document,
  );

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();

  await app.listen(configService.get('APP_PORT'));
  logger.log(`Application listening on port ${process.env.APP_PORT}!`);
}
bootstrap();
