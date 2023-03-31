import { IsBoolean, IsOptional, IsString } from "class-validator";

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
