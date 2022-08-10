import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Config, ConfigSchema } from 'src/models/config.model';
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
  ],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule {}
