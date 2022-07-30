import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { ImageFolderEnum } from 'src/interfaces/enums';

export class GetDirectUploadURLEntity {
    @IsNotEmpty()
    @IsEnum([ImageFolderEnum.ESTATE, ImageFolderEnum.NEWS])
    postType: ImageFolderEnum;

    @IsNotEmpty()
    @IsMongoId()
    postId: string;
}
