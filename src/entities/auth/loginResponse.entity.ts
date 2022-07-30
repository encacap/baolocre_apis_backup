import { Type } from 'class-transformer';
import { UserEntity } from '../user/user.entity';

export class LoginResponseEntity {
    @Type(() => UserEntity)
    readonly user: UserEntity;
    readonly accessToken: string;
    readonly refreshToken: string;

    constructor(user: UserEntity, accessToken: string, refreshToken: string) {
        this.user = user;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
