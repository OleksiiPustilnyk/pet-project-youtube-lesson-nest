import { NestFactory } from '@nestjs/core'; //создание и запуск приложения
import { AppModule } from './app/app.module'; //корневой модуль

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
