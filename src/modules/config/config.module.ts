import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Config, ConfigSchema } from 'src/models/config.model';
import { ImageModule } from '../image/image.module';
import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Config.name,
        schema: ConfigSchema,
      },
    ]),
    ImageModule,
  ],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule {}
