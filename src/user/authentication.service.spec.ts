import { Test } from "@nestjs/testing";
import RegisterDTO from "src/dto/register.dto";
import { AuthenticationSerivce } from "./authentication.service";
import { UserService } from "./user.service";
import { BadRequestException } from "@nestjs/common";

let service: AuthenticationSerivce;

describe("AuthenticationService", () => {
  let fakeUserService: Partial<UserService>;
  beforeEach(async () => {
    fakeUserService = {
      findOne: (id) =>
        Promise.resolve({
          id,
          email: "manhthanh147@gmail.com",
          password: "0909388963"
        }),
      findOneByEmail: (email) => Promise.resolve(null),
      addUser: (register: RegisterDTO) =>
        Promise.resolve({
          id: 1,
          email: register.email,
          password: register.password
        })
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthenticationSerivce,
        { provide: UserService, useValue: fakeUserService }
      ]
    }).compile();

    service = module.get(AuthenticationSerivce);
  });

  it("can create an instance of auth service", async () => {
    expect(service).toBeDefined();
  });
  it("create a new user with hashed password", async () => {
    const user = await service.signup("manhthanh147@gmail.com", "0123456");
    expect(user.password).not.toEqual("0123456");
  });
});
