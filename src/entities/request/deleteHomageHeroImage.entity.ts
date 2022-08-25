import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

@Exclude()
export class DeleteHomageHeroImageEntity {
  @Expose()
  @IsNotEmpty()
  imageId: ObjectId;
}
