import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

@Exclude()
export class AddHomepageHeroImagesEntity {
  @Expose()
  @IsNotEmpty()
  @IsArray()
  imageIds: ObjectId[];
}
