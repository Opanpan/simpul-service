import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://simpul-app.kinderheim511.com', 'http://localhost:5173'],
    credentials: true,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  console.log('DB URL =>', process.env.DATABASE_URL);
  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
