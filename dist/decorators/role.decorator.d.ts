import { Role } from 'src/interfaces/enums';
export declare const ROLE_KEY = "role";
export declare const Roles: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
