import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as FormData from 'form-data';
import mongoose, { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { ImageFolderEnum } from 'src/interfaces/enums';
import { UserDocument } from '../user/user.model';
import { Image, ImageDocument } from './image.model';

@Injectable()
export class ImageService {
  constructor(
    private readonly httpService: HttpService,
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

  async uploadImage(file: Express.Multer.File, folder: ImageFolderEnum, userId: string, postId?: string) {
    try {
      const fileName = this.generateFileName(folder, userId, postId);
      const formData = new FormData();

      formData.append('file', file.buffer, {
        filename: fileName,
      });

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
      throw new BadRequestException(error?.message || error?.response?.data);
    }
  }

  async uploadImages(files: Express.Multer.File[], folder: ImageFolderEnum, userId: string, postId?: string) {
    const images = await Promise.all(files.map((file) => this.uploadImage(file, folder, userId, postId)));
    return images;
  }

  private generateFileName(postType: ImageFolderEnum, userId: string, postId?: string) {
    const imageId = new mongoose.Types.ObjectId().toString();
    return `${postType}_${userId}_${postId || 'unknown'}_${imageId}`;
  }
}
