import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional, IsString } from 'class-validator';
import { Document } from 'mongoose';

export interface ContactDocument extends Contact, Document {}

@Schema()
export class Contact {
  @IsString()
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @IsString()
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  phone: string;

  @IsOptional()
  @IsString()
  @Prop({
    type: String,
  })
  email: string;

  @IsOptional()
  @IsString()
  @Prop({
    type: String,
  })
  zalo: string;

  @IsOptional()
  @IsString()
  @Prop({
    type: String,
  })
  facebook: string;

  @IsString()
  @Prop({
    type: String,
    required: true,
    ref: 'Image',
  })
  avatar: string;
}

const ContactSchema = SchemaFactory.createForClass(Contact);

export { ContactSchema };
