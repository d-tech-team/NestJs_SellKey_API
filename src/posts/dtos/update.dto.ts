import { IsNotEmpty } from 'class-validator';

export class updatePost {
    @IsNotEmpty()
    title: string;

    thumbnail: string

    @IsNotEmpty()
    content: string;
    @IsNotEmpty()
    category: string;
}
