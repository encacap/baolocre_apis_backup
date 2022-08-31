import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export interface EstateDocument extends Estate, mongoose.Document {}

@Schema()
export class Estate {
  @Prop({
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  })
  customId: string;

  @Prop(
    raw({
      city: {
        type: mongoose.Types.ObjectId,
        ref: 'City',
      },
      district: {
        type: mongoose.Types.ObjectId,
        ref: 'District',
      },
      ward: {
        type: mongoose.Types.ObjectId,
        ref: 'Ward',
      },
      street: String,
      map: String,
    }),
  )
  location: Record<string, string>;

  @Prop({
    type: String,
    trim: true,
  })
  title: string;

  @Prop({
    type: String,
    trim: true,
  })
  price: string;

  @Prop({
    type: String,
    trim: true,
  })
  area: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    trim: true,
  })
  category: mongoose.Types.ObjectId;

  @Prop({
    type: String,
  })
  direction: string;

  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Contact',
  })
  contact: mongoose.Types.ObjectId;

  @Prop({
    type: String,
    trim: true,
  })
  description: string;

  @Prop({
    type: String,
    trim: true,
  })
  youtubeVideoId: string;

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref: 'Image',
  })
  images: mongoose.Types.ObjectId[];
}

export const EstateSchema = SchemaFactory.createForClass(Estate);
