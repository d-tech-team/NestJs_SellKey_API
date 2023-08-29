import { IsNotEmpty, IsNumber, IsNumberString, IsString, Max, Min } from "class-validator";

export class CreateDiscountDto {

    @Max(12)
    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    name: number

    @Max(100)
    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    percent: number

}
