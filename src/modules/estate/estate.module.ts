import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Estate, EstateSchema } from 'src/models/estate.model';
import { EstateController } from './estate.controller';
import { EstateService } from './estate.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Estate.name, schema: EstateSchema }])],
  providers: [EstateService],
  controllers: [EstateController],
})
export class EstateModule {}
