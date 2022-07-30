import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenRequestEntity } from 'src/entities/request/refreshToken.entity';
import { CreateUserEntity } from '../../entities/request/createUser.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() user: CreateUserEntity) {
    return this.authService.register(user);
  }

  @Post('refresh')
  async refresh(@Body() { refreshToken: refreshTokenBody }: RefreshTokenRequestEntity) {
    return this.authService.refresh(refreshTokenBody);
  }
}
