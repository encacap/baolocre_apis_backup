import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { omit } from 'lodash';
import { UserDocument } from '../user/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

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

    public async login(user) {
        const authToken = await this.generateAuthToken(user);
        return {
            user,
            authToken,
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

        const authToken = await this.generateAuthToken(newUser);

        return {
            user: omit(newUser, 'password'),
            authToken,
        };
    }

    private async generateAuthToken(user: UserDocument) {
        return this.jwtService.sign({
            id: user.id,
            email: user.email,
        });
    }

    private async comparePassword(inputPassword: string, userPassword: string) {
        return bcryptjs.compare(inputPassword, userPassword);
    }

    private hashPassword(password: string) {
        return bcryptjs.hash(password, 10);
    }
}
