import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { UserService } from '../users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @ApiTags('API')
    @ApiResponse({ status: 201, type: AuthUserResponse })
    @HttpCode(201)
    @Post('register')
    register(@Body() dto: CreateUserDTO): Promise<AuthUserResponse> {
        return this.authService.registerUsers(dto);
    }

    @ApiTags('API')
    @ApiResponse({ status: 200, type: AuthUserResponse })
    @HttpCode(200)
    @Post('login')
    login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
        return this.authService.loginUser(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('test')
    test() {
        return true;
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-public-user-info')
    getPublicUserInfo(@Req() request) {
        const user = request.user;
        return this.userService.publicUser(user.email);
    }
}
