import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                useFactory() {
                    const schema = UserSchema;
                    schema.method('toClient', function () {
                        const user = this.toObject();

                        // Rename fields
                        user.id = user._id;

                        // Remove fields
                        delete user._id;

                        return user;
                    });
                    return schema;
                },
            },
        ]),
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
