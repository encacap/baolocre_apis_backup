import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageController } from './image.controller';
import { Image, ImageSchema } from './image.model';
import { ImageService } from './image.service';

@Module({
    controllers: [ImageController],
    providers: [ImageService],
    imports: [
        MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
        HttpModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                baseURL: configService.get('CLOUDFLARE_IMAGES_API_URL'),
                headers: {
                    Authorization: `Bearer ${configService.get('CLOUDFLARE_IMAGES_API_KEY')}`,
                },
            }),
            inject: [ConfigService],
        }),
    ],
})
export class ImageModule {}
