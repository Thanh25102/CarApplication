import { Expose } from "class-transformer";
import { BaseDTO } from "./base.dto";

export class UserDTO extends BaseDTO {
  @Expose()
  id: number;
  @Expose()
  email: string;
}
