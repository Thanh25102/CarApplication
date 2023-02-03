import { IsString, IsEmail, IsOptional } from 'class-validator';
export default class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  password: string;
}
