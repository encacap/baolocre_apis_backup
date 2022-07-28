import {
    Body,
    Controller,
    FileTypeValidator,
    Get,
    ParseFilePipe,
    Post,
    Request,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { GetDirectUploadURLEntity } from 'src/entities/image/getDirectUploadURL.entity';
import { ImageDirectUploadURLEntity } from 'src/entities/image/imageDirectUploadURL.entity';
import { UploadImageRequestEntity } from 'src/entities/image/uploadImageRequestEntity';
import { ImageService } from './image.service';

@UseGuards(AuthGuard('jwt'))
@Controller('images')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Get('direct-upload-url')
    async getDirectUploadURL(
        @Body() data: GetDirectUploadURLEntity,
        @Request() req,
    ): Promise<ImageDirectUploadURLEntity> {
        const fileName = await this.imageService.getDirectUploadURL(data.postType, req.user, data.postId);
        return fileName;
    }

    @Post('upload/single')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({
                        fileType: 'image/*',
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
        @Body() data: UploadImageRequestEntity,
        @Request() { user },
    ) {
        return this.imageService.uploadImage(file, data.folder, user.id, data.postId);
    }

    @Post('upload/multiple')
    @UseInterceptors(AnyFilesInterceptor())
    uploadMultipleImages(
        @UploadedFiles()
        files: Express.Multer.File[],
        @Body() data: UploadImageRequestEntity,
        @Request() { user },
    ) {
        console.log(files);
        return this.imageService.uploadImages(files, data.folder, user.id, data.postId);
    }
}
