import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateServerDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    code: string

    @IsIn(['vietnam', 'us', 'thailan', 'taiwand'])
    @IsNotEmpty()
    location: string
}
