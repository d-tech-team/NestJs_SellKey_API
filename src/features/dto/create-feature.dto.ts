import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateFeatureDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumberString()
    @IsNotEmpty()
    price: number;

    @IsIn(['normal', 'special'])
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    notice: string;

    @IsIn(['0', '1'])
    @IsNotEmpty()
    noti_enable: number;

}
