import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Estate, EstateDocument } from 'src/models/estate.model';

@Injectable()
export class EstateService {
  constructor(@InjectModel(Estate.name) private readonly estateModal: Model<EstateDocument>) {}

  async getEstates(): Promise<EstateDocument[]> {
    return this.estateModal.find().exec();
  }
}
