import {
  IsString,
  MinLength,
  IsUUID,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateServiceVariantDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsNumber()
  price!: number;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsUUID()
  serviceId!: string;
}
