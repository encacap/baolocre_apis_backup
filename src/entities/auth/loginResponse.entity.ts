import { Type } from 'class-transformer';
import { UserEntity } from '../user/user.entity';

export class LoginResponseEntity {
    @Type(() => UserEntity)
    readonly user: UserEntity;
    readonly authToken: string;

    constructor(user: UserEntity, authToken: string) {
        this.user = user;
        this.authToken = authToken;
    }
}
