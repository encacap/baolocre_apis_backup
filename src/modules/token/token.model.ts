import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { TokenTypeEnum } from 'src/interfaces/enums';

export interface TokenDocument extends Token, Document {}

@Schema()
export class Token {
    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
    })
    token: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    userId: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
        enum: [TokenTypeEnum.REFRESH],
    })
    type: string;

    @Prop({
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true,
    })
    sessionId: mongoose.Types.ObjectId;
}

const TokenSchema = SchemaFactory.createForClass(Token);

export { TokenSchema };
