import { UserDocument } from 'src/modules/user/user.model';

export class LoginResponseEntity {
    readonly user: UserDocument;
    readonly accessToken: string;
    readonly refreshToken: string;

    constructor(user: UserDocument, accessToken: string, refreshToken: string) {
        this.user = user.toObject();
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
