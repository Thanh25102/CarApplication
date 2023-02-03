import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { UserService } from './user.service';
import * as Bscrypt from 'bcrypt';

@Injectable()
export class AuthenticationSerivce {
  private readonly salt: number = 10;
  constructor(private userService: UserService) {}
  async signup(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user) throw new BadRequestException('Email has already exist');
    const passwordHashed = await Bscrypt.hash(password, this.salt);
    const userCreate = await this.userService.addUser({
      email,
      password: passwordHashed,
    });
    return userCreate;
  }
  async signin(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new NotFoundException("Email doesn't exist");
    const result = await Bscrypt.compare(password, user.password);
    if (!result) {
      throw new Error('Invalid password');
    }
    return user;
  }
}
