import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContactInformationEntity } from 'src/entities/config/contactInformation.entity';
import { ConfigService } from './config.service';

@UseGuards(AuthGuard('jwt'))
@Controller('configs')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Post('contact')
  async updateContactInformation(@Body() body: ContactInformationEntity) {
    return this.configService.updateContactInformation(body);
  }

  @Get('contact')
  async getContactInformation() {
    return this.configService.getContactInformation();
  }
}
