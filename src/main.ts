import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('API_TITLE'))
    .setDescription(configService.get<string>('API_DESCRIPTION'))
    .setVersion(configService.get<string>('API_VERSION'))
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    configService.get<string>('API_DOCUMENTATION_PATH'),
    app,
    document,
  );

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();

  await app.listen(configService.get<string>('APP_PORT'));
}
bootstrap();
