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
exports.ImageController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const getDirectUploadURL_entity_1 = require("../../entities/image/getDirectUploadURL.entity");
const uploadImageRequestEntity_1 = require("../../entities/image/uploadImageRequestEntity");
const image_service_1 = require("./image.service");
let ImageController = class ImageController {
    imageService;
    constructor(imageService) {
        this.imageService = imageService;
    }
    async getDirectUploadURL(data, req) {
        const fileName = await this.imageService.getDirectUploadURL(data.postType, req.user, data.postId);
        return fileName;
    }
    uploadImage(file, data, { user }) {
        return this.imageService.uploadImage(file, data.folder, user.id, data.postId);
    }
    uploadMultipleImages(files, data, { user }) {
        console.log(files);
        return this.imageService.uploadImages(files, data.folder, user.id, data.postId);
    }
};
__decorate([
    (0, common_1.Get)('direct-upload-url'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getDirectUploadURL_entity_1.GetDirectUploadURLEntity, Object]),
    __metadata("design:returntype", Promise)
], ImageController.prototype, "getDirectUploadURL", null);
__decorate([
    (0, common_1.Post)('upload/single'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({
                fileType: 'image/*',
            }),
        ],
    }))),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, uploadImageRequestEntity_1.UploadImageRequestEntity, Object]),
    __metadata("design:returntype", void 0)
], ImageController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('upload/multiple'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, uploadImageRequestEntity_1.UploadImageRequestEntity, Object]),
    __metadata("design:returntype", void 0)
], ImageController.prototype, "uploadMultipleImages", null);
ImageController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('images'),
    __metadata("design:paramtypes", [image_service_1.ImageService])
], ImageController);
exports.ImageController = ImageController;
//# sourceMappingURL=image.controller.js.map