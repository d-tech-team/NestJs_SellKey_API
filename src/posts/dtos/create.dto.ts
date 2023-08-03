import { IsNotEmpty } from 'class-validator';

export class createPost {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  category: string;
}
