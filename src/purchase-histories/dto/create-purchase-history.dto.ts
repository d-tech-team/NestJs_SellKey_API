import { IsNotEmpty, IsString } from "class-validator"

export class CreatePurchaseHistoryDto {

}

export class BuyDto {

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    server: string

    @IsString()
    @IsNotEmpty()
    feature: string

    @IsString()
    @IsNotEmpty()
    expiry_date: string
}
