import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Post,
    Request,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginResponseEntity } from 'src/entities/auth/loginResponse.entity';
import { RefreshTokenRequestEntity } from 'src/entities/auth/refreshTokenRequest.entity';
import { CreateUserEntity } from '../../entities/user/createUser.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req): Promise<LoginResponseEntity> {
        const { user, accessToken, refreshToken } = await this.authService.login(req.user);
        return new LoginResponseEntity(user, accessToken, refreshToken);
    }

    @Post('register')
    async register(@Body() user: CreateUserEntity) {
        return this.authService.register(user);
    }

    @Post('refresh')
    async refresh(@Body() { refreshToken }: RefreshTokenRequestEntity) {
        return this.authService.refresh(refreshToken);
    }
}
