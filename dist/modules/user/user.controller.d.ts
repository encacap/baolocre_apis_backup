import { CreateUserEntity } from '../../entities/user/createUser.entity';
export declare class UserController {
    findAll(): string;
    create(createUserDto: CreateUserEntity): CreateUserEntity;
}
