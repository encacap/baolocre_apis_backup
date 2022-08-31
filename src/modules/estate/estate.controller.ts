import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateEstateEntity } from 'src/entities/request/createEstate.entity';
import { EstateDocument } from 'src/models/estate.model';
import { EstateService } from './estate.service';

@Controller('estates')
export class EstateController {
  constructor(private readonly estateService: EstateService) {}

  @Get()
  async getEstates(): Promise<EstateDocument[]> {
    return this.estateService.getEstates();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createEstate(@Body() body: CreateEstateEntity) {
    return {
      ...body,
    };
  }
}
