import { Role } from 'src/interfaces/enums';
export declare class CreateUserEntity {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    roles: Role[];
}
