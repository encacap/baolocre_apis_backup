"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const image_controller_1 = require("./image.controller");
const image_model_1 = require("./image.model");
const image_service_1 = require("./image.service");
let ImageModule = class ImageModule {
};
ImageModule = __decorate([
    (0, common_1.Module)({
        controllers: [image_controller_1.ImageController],
        providers: [image_service_1.ImageService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: image_model_1.Image.name, schema: image_model_1.ImageSchema }]),
            axios_1.HttpModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    baseURL: configService.get('CLOUDFLARE_IMAGES_API_URL'),
                    headers: {
                        Authorization: `Bearer ${configService.get('CLOUDFLARE_IMAGES_API_KEY')}`,
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], ImageModule);
exports.ImageModule = ImageModule;
//# sourceMappingURL=image.module.js.map