import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from 'src/configurations';

// расширяем класс AppModule
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configurations],
        }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dialect: 'postgres',
                host: configService.get('db_host'),
                port: configService.get('db_port'),
                username: configService.get('db_user'),
                password: configService.get('db_password'),
                database: configService.get('db_name'),
                synchronize: true,
                autoLoadModels: true,
                models: [],
            }),
        }),
        UserModule,
    ], //forFeature - работаем внутри модуля, forRoot - работаем глобально, forRootAsync - для работы ассинхронно
    controllers: [AppController],
    providers: [AppService], //обрабатывают бизнес логику проекта
})
export class AppModule {}
