import { Exclude, Transform } from 'class-transformer';

export class UserEntity {
    email: string;
    firstName: string;
    lastName: string;

    @Transform(({ value }) => value.toString())
    id: string;

    @Exclude()
    password: string;

    @Exclude()
    __v: number;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
