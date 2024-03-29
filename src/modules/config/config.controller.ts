import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContactInformationEntity } from 'src/entities/config/contactInformation.entity';
import { AddHomepageHeroImagesEntity } from 'src/entities/request/addHomepageHeroImages.entity';
import { DeleteHomageHeroImageEntity } from 'src/entities/request/deleteHomageHeroImage.entity';
import { ConfigService } from './config.service';

@Controller('configs')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @UseGuards(AuthGuard('jwt'))
  @Put('contact')
  async updateContactInformation(@Body() body: ContactInformationEntity) {
    return this.configService.updateContactInformation(body);
  }

  @Get('contact')
  async getContactInformation() {
    return this.configService.getContactInformation();
  }

  @Get('homepage-hero-images')
  async getHomePageHeroImages() {
    return this.configService.getHomePageHeroImages();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('homepage-hero-images')
  async addHomePageHeroImages(@Body() { imageIds }: AddHomepageHeroImagesEntity) {
    return this.configService.addHomePageHeroImages(imageIds);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('homepage-hero-images/:imageId')
  async deleteHomePageHeroImages(@Param() { imageId }: DeleteHomageHeroImageEntity) {
    return this.configService.deleteHomePageHeroImages(imageId);
  }
}
