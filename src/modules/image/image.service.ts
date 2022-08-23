import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as FormData from 'form-data';
import mongoose, { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { ImageFolderEnum } from 'src/interfaces/enums';
import { Image, ImageDocument } from '../../models/image.model';
import { UserDocument } from '../../models/user.model';

@Injectable()
export class ImageService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>,
  ) {}

  async getDirectUploadURL(postType: ImageFolderEnum, user: UserDocument, postId: string) {
    try {
      const fileName = this.generateFileName(postType, user.id, postId);
      const response = await lastValueFrom(this.httpService.post('v2/direct_upload'));
      const uploadURL = response.data.result.uploadURL;
      return {
        uploadURL,
        fileName,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async uploadImageFile(
    file: Express.Multer.File | string,
    folder: ImageFolderEnum,
    userId: string,
    postId?: string,
  ) {
    try {
      const fileName = this.generateFileName(folder, userId, postId);
      const formData = new FormData();

      if (typeof file !== 'string') {
        formData.append('file', file.buffer, {
          filename: fileName,
        });
      } else {
        formData.append('url', file, {
          filename: fileName,
        });
      }

      formData.append(
        'metadata',
        JSON.stringify({
          folder,
          userId,
          postId,
          name: fileName,
        }),
      );

      const response = await lastValueFrom(this.httpService.post('v1', formData));

      const uploadedImageData = response.data.result;

      const newImage = new this.imageModel({
        _id: fileName.split('_').at(-1),
        filename: uploadedImageData.filename,
        variants: uploadedImageData.variants,
        requireSignedURLs: uploadedImageData.requireSignedURLs,
        user: userId,
        folder,
      });

      return newImage.save();
    } catch (error) {
      throw new BadRequestException(error?.response?.data || error?.message);
    }
  }

  async uploadImages(
    files: Express.Multer.File[],
    urls: string[],
    folder: ImageFolderEnum,
    userId: string,
    postId?: string,
  ) {
    const images = await Promise.all([
      ...files.map((file) => this.uploadImageFile(file, folder, userId, postId)),
      ...urls.map((url) => this.uploadImageFile(url, folder, userId, postId)),
    ]);
    return images;
  }

  private generateFileName(postType: ImageFolderEnum, userId: string, postId?: string) {
    const imageId = new mongoose.Types.ObjectId().toString();
    return `${this.configService.get('CLOUDFLARE_IMAGES_PREFIX')}_${postType}_${userId}_${
      postId || 'unknown'
    }_${imageId}`;
  }
}
