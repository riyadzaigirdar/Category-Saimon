import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  name: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString({ each: true })
  subCategories: string[];

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

export class ListCategoryQueryDto {
  @IsOptional()
  @IsNumber()
  page: number = 1;

  @IsOptional()
  @IsNumber()
  count: number = 10;
}
