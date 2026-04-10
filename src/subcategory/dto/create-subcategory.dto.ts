import { IsString, MinLength, IsUUID } from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsUUID()
  categoryId!: string;
}
