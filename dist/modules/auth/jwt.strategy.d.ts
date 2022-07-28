import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { UserDocument } from '../user/user.model';
import { UserService } from '../user/user.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    private readonly configService;
    constructor(userService: UserService, configService: ConfigService);
    validate(payload: UserDocument): Promise<UserDocument>;
}
export {};
