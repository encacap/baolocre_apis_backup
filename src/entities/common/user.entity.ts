import { Exclude } from 'class-transformer';

export class UserEntity {
  readonly _id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;

  @Exclude()
  password: string;

  readonly createdAt: Date;
}
