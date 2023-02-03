import { IsString, IsEmail } from 'class-validator';
import { BaseDTO } from './base.dto';
export default class RegisterDTO extends BaseDTO {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
