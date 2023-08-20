import { IsNotEmpty, IsString } from "class-validator"

export class CreateSystemDto {

    @IsString()
    @IsNotEmpty()
    apiAccessToken: string

    @IsString()
    @IsNotEmpty()
    apiAccessPhone: string

    @IsString()
    @IsNotEmpty()
    facebookPluginChatScript: string

    @IsString()
    @IsNotEmpty()
    notication: string
}
