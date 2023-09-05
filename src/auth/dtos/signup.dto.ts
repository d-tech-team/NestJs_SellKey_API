import { IsNotEmpty, IsEmail, Matches, IsString } from 'class-validator';
import { Match } from 'src/common/decorator/match.decorator';

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
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password', {
    message: 'Mật khẩu và mật khẩu nhập lại không giống nhau'
  })
  rePassword: string;
}
