import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );
  app.enableCors({
    origin: ['http://localhost:4200', 'https://dhbw-richie.de']
  });
  app.setGlobalPrefix('/api');
  app.use(cookieParser());
  await app.listen(3000);
}
process.env.TZ = 'Europe/Amsterdam';
bootstrap();
