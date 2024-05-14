import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto';
import { AppError } from 'src/common/errors';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
    ) {}

    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }

    async findUserByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }

    async createUser(dto): Promise<CreateUserDTO> {
        //если юзер уже есть с таким email
        const existUser = await this.findUserByEmail(dto.email);
        if (existUser) throw new BadRequestException(AppError.USER_EXIST);
        //

        dto.password = await this.hashPassword(dto.password);

        // 1 способ создания юзера
        // const newUser = {
        //     firstName: dto.firstName,
        //     username: dto.username,
        //     email: dto.email,
        //     password: dto.password,
        // };
        // await this.userRepository.create(newUser);

        // 2 способ создания юзера
        await this.userRepository.create({
            firstName: dto.firstName,
            username: dto.username,
            email: dto.email,
            password: dto.password,
        });
        return dto;
    }
}
