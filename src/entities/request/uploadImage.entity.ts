import { IsArray, IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { ImageFolderEnum } from 'src/interfaces/enums';

export class UploadImageRequestEntity {
  @IsEnum(ImageFolderEnum)
  folder: ImageFolderEnum;

  @IsOptional()
  @IsMongoId()
  postId: string;

  @IsOptional()
  @IsArray()
  urls: string[];
}
