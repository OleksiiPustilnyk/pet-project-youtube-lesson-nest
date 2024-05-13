import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';

// расширяем класс AppModule
@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService], //обрабатывают бизнес логику проекта
})
export class AppModule {}
