import { IsNotEmpty, IsEmail, Matches } from 'class-validator';

export class SignupDTO {

  @IsEmail()
  email: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,}$/,
    {
      message:
        'Mật khẩu ít nhất 8 kí tự, bao gồm chữ in hoa, chữ thường, số và kí tự đặc biệt',
    },
  )
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  rePassword: string;
}
