import { Test } from '@nestjs/testing';
import RegisterDTO from 'src/dto/register.dto';
import { AuthenticationSerivce } from './authentication.service';
import { UserService } from './user.service';
let service: AuthenticationSerivce;
beforeEach(async () => {
  const fakeUserService: Partial<UserService> = {
    findOne: (id) =>
      Promise.resolve({
        id,
        email: 'manhthanh147@gmail.com',
        password: '0909388963',
      }),
    addUser: (register: RegisterDTO) =>
      Promise.resolve({
        id: 1,
        email: register.email,
        password: register.password,
      }),
  };
  const module = await Test.createTestingModule({
    providers: [
      AuthenticationSerivce,
      { provide: UserService, useValue: fakeUserService },
    ],
  }).compile();

  service = module.get(AuthenticationSerivce);
});

it('can create an instance of auth service', async () => {
  expect(service).toBeDefined();
});
