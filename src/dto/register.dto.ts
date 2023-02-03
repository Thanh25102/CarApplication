import { IsString, IsEmail } from 'class-validator';
export default class RegisterDTO {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
