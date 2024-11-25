import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto, UpdateContactDto } from 'src/dto/contact.dto';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // for adding a contact in db
  @Post()
  async addContact(@Body() createContactDto: CreateContactDto) {
    return this.contactService.addContact(createContactDto); // Pass DTO to service
  }
  // for fetching all contact form db based on query passed (if no query is passed then by deafult all the contacts will fetched)
  @Get()
  async findAll(@Query() query: any) {
    return this.contactService.findAll(query);
  }

  // for fetching specific contact form db based on ID passed in Paramater
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.contactService.findOne(id);
  }
  // for updating  specific user in the DB.
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactService.update(id, updateContactDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.contactService.delete(id);
  }
}
