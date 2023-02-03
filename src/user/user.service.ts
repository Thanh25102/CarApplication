import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import RegisterDTO from 'src/dto/register.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  addUser(register: RegisterDTO) {
    const user = this.userRepo.create({
      email: register.email,
      password: register.password,
    });
    this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }
  findOneByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) throw new Error('User not found exception');
    Object.assign(user, attrs);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new Error('User not found exception');
    return this.userRepo.remove(user);
  }
}
