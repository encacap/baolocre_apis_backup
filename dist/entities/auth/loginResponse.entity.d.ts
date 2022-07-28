import { UserEntity } from '../user/user.entity';
export declare class LoginResponseEntity {
    readonly user: UserEntity;
    readonly authToken: string;
    constructor(user: UserEntity, authToken: string);
}
