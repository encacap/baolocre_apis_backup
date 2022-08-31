import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { CategoryTypeEnum } from 'src/interfaces/enums';

export interface CategoryDocument extends Category, Document {}

@Schema()
export class Category {
  @IsString()
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
  })
  name: string;

  @IsOptional()
  @IsString()
  @Prop({
    type: String,
    required: true,
    trim: true,
    unique: true,
  })
  slug: string;

  @IsOptional()
  @IsString()
  @Prop({
    type: String,
    trim: true,
  })
  description: string;

  @IsString()
  @Prop({
    type: String,
    required: true,
    trim: true,
    ref: 'Image',
  })
  image: string;

  @IsString()
  @IsEnum(CategoryTypeEnum)
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  type: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
