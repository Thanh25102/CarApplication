import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Delete, Get, Param, Put, Query } from '@nestjs/common/decorators';
import RegisterDTO from 'src/dto/register.dto';
import UpdateUserDTO from 'src/dto/update-user.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/signup')
  createUser(@Body() register: RegisterDTO) {
    this.userService.addUser(register);
  }
  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  findUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
  @Get()
  findUserByEmail(@Query('email') email: string) {
    return this.userService.findOneByEmail(email);
  }
  @Delete('/:id')
  removeUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }
  @Put('/:id')
  updateUser(@Param('id') id: number, @Body() updateUser: UpdateUserDTO) {
    return this.userService.update(id, updateUser);
  }
}
