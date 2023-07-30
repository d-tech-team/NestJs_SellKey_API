import { IsNotEmpty, IsEmail } from 'class-validator';

export class SigninDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
