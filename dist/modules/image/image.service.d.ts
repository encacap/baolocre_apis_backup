/// <reference types="multer" />
import { HttpService } from '@nestjs/axios';
import mongoose, { Model } from 'mongoose';
import { ImageFolder } from 'src/interfaces/enums';
import { UserDocument } from '../user/user.model';
import { ImageDocument } from './image.model';
export declare class ImageService {
    private readonly httpService;
    private readonly imageModel;
    constructor(httpService: HttpService, imageModel: Model<ImageDocument>);
    getDirectUploadURL(postType: ImageFolder, user: UserDocument, postId: string): Promise<{
        uploadURL: any;
        fileName: string;
    }>;
    uploadImage(file: Express.Multer.File, folder: ImageFolder, userId: string, postId?: string): Promise<mongoose.Document<unknown, any, ImageDocument> & ImageDocument & {
        _id: mongoose.Types.ObjectId;
    }>;
    uploadImages(files: Express.Multer.File[], folder: ImageFolder, userId: string, postId?: string): Promise<(mongoose.Document<unknown, any, ImageDocument> & ImageDocument & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    private generateFileName;
}
