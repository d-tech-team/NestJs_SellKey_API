import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as csurf from 'csurf';
import { BadRequestExceptionFilter } from './fillter/badrequest-exeption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.use(csurf());
  app.enableCors(
    {
      allowedHeaders: '*',
      origin: '*',
      credentials: true,
    }
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new BadRequestExceptionFilter());

  app.setGlobalPrefix(process.env.PREFIX_ROUTE || 'api');
  await app.listen(process.env.GLOBAL_PORT || 3000);
}
bootstrap();
