"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const FormData = require("form-data");
const mongoose_2 = require("mongoose");
const rxjs_1 = require("rxjs");
const image_model_1 = require("./image.model");
let ImageService = class ImageService {
    httpService;
    imageModel;
    constructor(httpService, imageModel) {
        this.httpService = httpService;
        this.imageModel = imageModel;
    }
    async getDirectUploadURL(postType, user, postId) {
        try {
            const fileName = this.generateFileName(postType, user.id, postId);
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.post('v2/direct_upload'));
            const uploadURL = response.data.result.uploadURL;
            return {
                uploadURL,
                fileName,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async uploadImage(file, folder, userId, postId) {
        try {
            const fileName = this.generateFileName(folder, userId, postId);
            const formData = new FormData();
            formData.append('file', file.buffer, {
                filename: fileName,
            });
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.post('v1', formData));
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
        }
        catch (error) {
            throw new common_1.BadRequestException(error?.message || error?.response?.data);
        }
    }
    async uploadImages(files, folder, userId, postId) {
        const images = await Promise.all(files.map((file) => this.uploadImage(file, folder, userId, postId)));
        return images;
    }
    generateFileName(postType, userId, postId) {
        const imageId = new mongoose_2.default.Types.ObjectId().toString();
        return `${postType}_${userId}_${postId || 'unknown'}_${imageId}`;
    }
};
ImageService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(image_model_1.Image.name)),
    __metadata("design:paramtypes", [axios_1.HttpService,
        mongoose_2.Model])
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map