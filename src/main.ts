import { NestFactory } from '@nestjs/core'; //создание и запуск приложения
import { AppModule } from './modules/app/app.module'; //корневой модуль
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: ['http://localhost:3000'],
        },
    });
    const configService = app.get(ConfigService);
    const port = configService.get('port');
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder() // Swagger нужен для создания документации, его можно вызвать по ссылке: http://localhost:3000/api
        .setTitle('Lesson api')
        .setDescription('This api for lesson')
        .setVersion('1.0')
        .addTag('API')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(port);
}
bootstrap();
