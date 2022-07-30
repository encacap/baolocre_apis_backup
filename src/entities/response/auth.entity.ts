import { Type } from 'class-transformer';
import { UserEntity } from '../common/user.entity';

export class AuthResponseEntity {
  @Type(() => UserEntity)
  readonly user: UserEntity;
  readonly accessToken: string;
  readonly refreshToken: string;

  constructor(user, accessToken: string, refreshToken: string) {
    this.user = user?.toObject() || user;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
