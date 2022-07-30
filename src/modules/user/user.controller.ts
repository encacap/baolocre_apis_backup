import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/core/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RoleEnum } from 'src/interfaces/enums';
import { CreateUserEntity } from '../../entities/request/createUser.entity';

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(RoleEnum.USER)
  @Post()
  create(@Body() createUserDto: CreateUserEntity): CreateUserEntity {
    return createUserDto;
  }
}
