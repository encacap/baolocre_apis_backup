import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TokenTypeEnum } from 'src/interfaces/enums';

export interface TokenDocument extends Token, Document {}

@Schema()
export class Token {
    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
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
}

const TokenSchema = SchemaFactory.createForClass(Token);

export { TokenSchema };
