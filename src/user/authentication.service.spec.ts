import { Test } from '@nestjs/testing';
import { AuthenticationSerivce } from './authentication.service';
import { UserService } from './user.service';
it('can create an instance of auth service', async () => {
  const fakeUserService = {
    findOne: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),
  };
  const module = await Test.createTestingModule({
    providers: [
      AuthenticationSerivce,
      { provide: UserService, useValue: fakeUserService },
    ],
  }).compile();

  const service = module.get(AuthenticationSerivce);

  expect(service).toBeDefined();
});
