import { Controller, Post, Body } from '@nestjs/common';
import {
  Delete,
  Get,
  Param,
  Put,
  Query,
  Session,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import RegisterDTO from 'src/dto/register.dto';
import UpdateUserDTO from 'src/dto/update-user.dto';
import { UserDTO } from 'src/dto/user.dto';
import { Serialize } from 'src/interceptor/Serialize.interceptor';
import { AuthenticationSerivce } from './authentication.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthenticationSerivce,
  ) {}
  @Get('/whoiam')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
  @Post('/signout')
  logout(@Session() session: any) {
    session.userId = null;
  }
  @Post('/signup')
  async createUser(@Body() register: RegisterDTO, @Session() session: any) {
    const user = await this.authService.signup(
      register.email,
      register.password,
    );
    session.userId = user.id;
    return user;
  }
  @Post('/signin')
  @Serialize(UserDTO)
  async signin(@Body() register: RegisterDTO, @Session() session: any) {
    const user = await this.authService.signin(
      register.email,
      register.password,
    );
    session.userId = user.id;
    return user;
  }
  @Get('/:id')
  @Serialize(UserDTO)
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
