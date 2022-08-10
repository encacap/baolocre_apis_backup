import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface ConfigDocument extends Config, Document {}

@Schema()
export class Config {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  key: string;

  @Prop({
    type: String,
    required: true,
  })
  value: string;
}

const ConfigSchema = SchemaFactory.createForClass(Config);

export { ConfigSchema };
