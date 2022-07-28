import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/core/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/interfaces/enums';
import { CreateUserEntity } from '../../entities/user/createUser.entity';

@Controller('users')
export class UserController {
    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll(): string {
        return 'This action returns all users';
    }

    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles(Role.USER)
    @Post()
    create(@Body() createUserDto: CreateUserEntity): CreateUserEntity {
        return createUserDto;
    }
}
