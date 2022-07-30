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
import { RefreshTokenRequestEntity } from 'src/entities/request/refreshToken.entity';
import { AuthResponseEntity } from 'src/entities/response/auth.entity';
import { CreateUserEntity } from '../../entities/request/createUser.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<AuthResponseEntity> {
    const { user, accessToken, refreshToken } = await this.authService.login(req.user);
    return new AuthResponseEntity(user, accessToken, refreshToken);
  }

  @Post('register')
  async register(@Body() user: CreateUserEntity) {
    return this.authService.register(user);
  }

  @Post('refresh')
  async refresh(
    @Body() { refreshToken: refreshTokenBody }: RefreshTokenRequestEntity,
  ): Promise<AuthResponseEntity> {
    const { user, accessToken, refreshToken } = await this.authService.refresh(refreshTokenBody);
    return new AuthResponseEntity(user, accessToken, refreshToken);
  }
}
