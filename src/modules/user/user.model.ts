import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/interfaces/enums';

export interface UserDocument extends User, Document {
    id: string;
}

@Schema()
export class User {
    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    })
    email: string;

    @Prop({
        type: String,
        required: true,
    })
    password: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    firstName: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    lastName: string;

    @Prop([
        {
            type: String,
            enum: [Role.ADMIN, Role.USER],
            default: [Role.USER],
        },
    ])
    roles: string[];
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
