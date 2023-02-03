import { IsString, IsEmail, IsOptional } from 'class-validator';
import { BaseDTO } from './base.dto';
export default class UpdateUserDTO extends BaseDTO {
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  password: string;
}
