import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { TokenModule } from '../token/token.module';

@Module({
    imports: [SequelizeModule.forFeature([User]), TokenModule],
    controllers: [UserController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UserModule {}
