import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface ImageDocument extends Image, Document {}

@Schema()
export class Image {
    @Prop({
        type: Boolean,
        default: false,
    })
    requireSignedURLs: boolean;

    @Prop({
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    })
    filename: string;

    @Prop([
        {
            type: String,
            required: true,
            trim: true,
        },
    ])
    variants: string[];

    @Prop({
        type: String,
        required: true,
        trim: true,
        ref: 'User',
    })
    user: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    folder: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
