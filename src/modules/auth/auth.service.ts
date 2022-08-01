import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { omit } from 'lodash';
import { TokenService } from '../token/token.service';
import { UserDocument } from '../user/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly tokenService: TokenService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const isMatched = await this.comparePassword(password, user.password);

    if (!isMatched) {
      return null;
    }

    return user;
  }

  public async login(user: UserDocument) {
    const authTokens = await this.tokenService.generateAuthTokens(user);
    return {
      user,
      ...authTokens,
    };
  }

  public async register(user) {
    const hashedPassword = await this.hashPassword(user.password);

    const existingUser = await this.userService.findOneByEmail(user.email);

    if (existingUser) {
      throw new UnauthorizedException();
    }

    const newUser = await this.userService.create({
      ...user,
      password: hashedPassword,
    });

    const authTokens = await this.tokenService.generateAuthTokens(newUser);

    return {
      user: omit(newUser, 'password'),
      ...authTokens,
    };
  }

  public async refreshToken(refreshToken) {
    return this.tokenService.generateAuthTokensFromRefreshToken(refreshToken);
  }

  private async comparePassword(inputPassword: string, userPassword: string) {
    return bcryptjs.compare(inputPassword, userPassword);
  }

  private hashPassword(password: string) {
    return bcryptjs.hash(password, 10);
  }
}
