import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS so the frontend (vite dev server) can call the backend
  app.enableCors({
  origin: 'http://localhost:5173', // ou sua porta do front
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
