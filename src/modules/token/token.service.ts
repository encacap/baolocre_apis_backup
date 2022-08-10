import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { TokenTypeEnum } from 'src/interfaces/enums';
import { Token, TokenDocument } from '../../models/token.model';
import { UserDocument } from '../../models/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async generateAuthTokens(user: UserDocument) {
    const loginSessionId = new mongoose.Types.ObjectId();
    const accessToken = await this.generateAccessToken(user, loginSessionId);
    const refreshToken = await this.generateRefreshToken(user, loginSessionId);
    return {
      accessToken,
      refreshToken,
    };
  }

  async generateAuthTokensFromRefreshToken(refreshToken: string) {
    const tokenPayload = await this.jwtService.verify(refreshToken);
    const user = await this.userService.findOneById(tokenPayload.id);
    const savedRefreshToken = await this.tokenModel.findOne({
      userId: user.id,
      token: refreshToken,
    });
    if (!user || !savedRefreshToken) {
      throw new UnauthorizedException();
    }
    const accessToken = await this.generateAccessToken(user, savedRefreshToken.sessionId);
    return {
      user,
      refreshToken: savedRefreshToken.token,
      accessToken,
    };
  }

  private async generateAccessToken(user: UserDocument, loginSessionId: mongoose.Types.ObjectId) {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
      sessionId: loginSessionId,
    });
  }

  private async generateRefreshToken(user: UserDocument, loginSessionId: mongoose.Types.ObjectId) {
    const refreshToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        sessionId: loginSessionId,
      },
      {
        expiresIn: `${this.configService.get('JWT_REFRESH_EXPIRATION_DAYS')}d`,
      },
    );

    await new this.tokenModel({
      token: refreshToken,
      userId: user.id,
      type: TokenTypeEnum.REFRESH,
      sessionId: loginSessionId,
    }).save();

    return refreshToken;
  }
}
