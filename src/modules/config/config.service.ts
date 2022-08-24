import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { uniq } from 'lodash';
import { ObjectId } from 'mongoose';
import { ContactInformationEntity } from 'src/entities/config/contactInformation.entity';
import { Config, ConfigDocument } from 'src/models/config.model';
import { ImageService } from '../image/image.service';

@Injectable()
export class ConfigService {
  contactInformationKeys: string[];

  constructor(
    @InjectModel(Config.name) private readonly configModel,
    private readonly imageService: ImageService,
  ) {
    this.contactInformationKeys = ['address', 'phoneNumber', 'zalo', 'facebook', 'youtube'];
  }

  async updateConfigByKey(key: string, value: string) {
    if (!value) {
      return Promise.resolve();
    }
    const config = await this.configModel.findOne({ key });
    if (!config) {
      return this.configModel.create({ key, value });
    }
    config.value = value;
    return config.save();
  }

  async updateContactInformation(contactInformation: ContactInformationEntity) {
    await Promise.all(
      this.contactInformationKeys.map((key) => this.updateConfigByKey(key, contactInformation[key])),
    );
    return contactInformation;
  }

  async getContactInformation() {
    const configs = await this.configModel.find({ key: { $in: this.contactInformationKeys } });
    return configs.reduce((result: ContactInformationEntity, config: ConfigDocument) => {
      result[config.key] = config.value;
      return result;
    }, {} as ContactInformationEntity);
  }

  async getHomePageHeroImages() {
    const configsStringified = await this.configModel.findOne({ key: 'homepageHeroImages' });
    if (!configsStringified) {
      return [];
    }
    const configParser = JSON.parse(configsStringified.value);
    const images = await this.imageService.getImageByIds(configParser);
    return images;
  }

  async addHomePageHeroImages(imageIds: ObjectId[]) {
    const config = await this.configModel.findOne({ key: 'homepageHeroImages' });
    if (!config) {
      return this.configModel.create({ key: 'homepageHeroImages', value: JSON.stringify(imageIds) });
    }
    const parsedValue = JSON.parse(config.value);
    parsedValue.push(...imageIds);
    config.value = JSON.stringify(uniq(parsedValue));
    await config.save();
    const images = await this.imageService.getImageByIds(parsedValue);
    return images;
  }
}
