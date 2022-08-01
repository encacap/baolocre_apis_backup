import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { omit } from 'lodash';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOneById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string) {
    const user = this.userModel.findOne({ email }).exec();
    return user;
  }

  public async getMe(user: UserDocument) {
    const savedUser = await this.userModel.findById(user.id);
    return omit(savedUser, 'password');
  }
}
