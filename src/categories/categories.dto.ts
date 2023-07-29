import { IsNotEmpty, IsString } from 'class-validator';

export class CategoriesDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
