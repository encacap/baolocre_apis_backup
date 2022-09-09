import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Contact } from 'src/models/contact.model';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async getContacts() {
    return await this.contactService.getContacts();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createContact(@Body() createContactBody: Contact) {
    return await this.contactService.createContact(createContactBody);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateContact(@Param() { id }, @Body() updateContactBody: Contact) {
    return await this.contactService.updateContactById(id, updateContactBody);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteContact(@Param() { id }) {
    return await this.contactService.deleteContactById(id);
  }
}
