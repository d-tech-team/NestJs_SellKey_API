import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateChangelogDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumberString()
    @IsNotEmpty()
    version: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}
