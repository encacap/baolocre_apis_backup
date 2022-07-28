import { IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { ImageFolder } from 'src/interfaces/enums';

export class UploadImageRequestEntity {
    @IsEnum(ImageFolder)
    folder: ImageFolder;

    @IsOptional()
    @IsMongoId()
    postId: string;
}
