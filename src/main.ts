import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://simpul-app.kinderheim511.com'],
    credentials: true,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
