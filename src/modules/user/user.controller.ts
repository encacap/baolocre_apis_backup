import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/role.decorator';
import { RoleEnum } from 'src/interfaces/enums';
import { CreateUserEntity } from '../../entities/request/createUser.entity';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): string {
    return 'This action returns all users';
  }

  @Roles(RoleEnum.USER)
  @Post()
  create(@Body() createUserDto: CreateUserEntity): CreateUserEntity {
    return createUserDto;
  }

  @Get('me')
  getMe(@Request() req) {
    return this.userService.getMe(req.user);
  }
}
