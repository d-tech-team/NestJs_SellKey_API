import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(csurf());
   
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.setGlobalPrefix(process.env.PREFIX_ROUTE || 'api');
  await app.listen(process.env.GLOBAL_PORT || 3000);
}
bootstrap();
