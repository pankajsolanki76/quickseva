import { IsString, MinLength, IsOptional, IsUUID } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUUID()
  subCategoryId!: string;
}
