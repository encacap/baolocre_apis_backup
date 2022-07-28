import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { ImageFolder } from 'src/interfaces/enums';

export class GetDirectUploadURLEntity {
    @IsNotEmpty()
    @IsEnum([ImageFolder.ESTATE, ImageFolder.NEWS])
    postType: ImageFolder;

    @IsNotEmpty()
    @IsMongoId()
    postId: string;
}
