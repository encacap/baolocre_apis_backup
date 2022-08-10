import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ContactInformationEntity } from 'src/entities/config/contactInformation.entity';
import { Config, ConfigDocument } from 'src/models/config.model';

@Injectable()
export class ConfigService {
  contactInformationKeys: string[];

  constructor(@InjectModel(Config.name) private readonly configModel) {
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
}
