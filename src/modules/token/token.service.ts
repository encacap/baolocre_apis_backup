import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { TokenTypeEnum } from 'src/interfaces/enums';
import { UserDocument } from '../user/user.model';
import { Token, TokenDocument } from './token.model';

@Injectable()
export class TokenService {
    constructor(
        @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
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
                loginSessionId,
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
