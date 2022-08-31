import { Optional } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { EstateDirectionEnum } from 'src/interfaces/enums';

@Exclude()
export class CreateEstateEntity {
  @IsOptional()
  @IsString()
  customId: string;

  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsString()
  ward: string;

  @IsOptional()
  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  map: string;

  @IsString()
  title: string;

  @IsString()
  price: string;

  @IsString()
  area: string;

  @IsString()
  category: string;

  @IsString()
  @IsEnum(EstateDirectionEnum)
  direction: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  contact: string;

  @Optional()
  @IsString()
  youtubeVideoId: string;

  @Optional()
  @IsArray()
  images: string[];
}
