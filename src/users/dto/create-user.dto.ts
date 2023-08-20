import { IsIn, IsNotEmpty, IsNumberString } from "class-validator";

export class CreateUserDto {

    @IsNumberString()
    @IsNotEmpty()
    cash: number

    @IsIn(['admin', 'user', 'agency'])
    @IsNotEmpty()
    role: string
}