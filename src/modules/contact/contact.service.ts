import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from 'src/models/contact.model';

@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact.name) private readonly contactModel: Model<ContactDocument>) {}

  async getContacts(): Promise<ContactDocument[]> {
    return this.contactModel.find().populate('avatar').exec();
  }

  async createContact(createContactBody: Contact): Promise<ContactDocument> {
    try {
      const newContact = new this.contactModel(createContactBody);
      const savedContact = await newContact.save();
      return savedContact.populate('avatar');
    } catch (error) {
      const { code } = error;
      if (code === 11000) {
        const { keyValue } = error;
        throw new BadRequestException({
          errors: Object.keys(keyValue).map((key) => ({
            field: key,
            message: [`${keyValue[key]} đã tồn tại`],
          })),
        });
      }
      throw new BadRequestException(error.message);
    }
  }

  async updateContactById(id: string, updateContactBody: Contact): Promise<ContactDocument> {
    const updatedContact = await this.contactModel.findByIdAndUpdate(id, updateContactBody, { new: true });
    return updatedContact.populate('avatar');
  }

  async deleteContactById(id: string): Promise<ContactDocument> {
    const deletedContact = await this.contactModel.findByIdAndDelete(id);
    return deletedContact.populate('avatar');
  }
}
