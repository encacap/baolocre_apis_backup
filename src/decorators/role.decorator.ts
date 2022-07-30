import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from 'src/interfaces/enums';

export const ROLE_KEY = 'role';
export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLE_KEY, roles);
