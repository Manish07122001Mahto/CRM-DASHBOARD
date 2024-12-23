import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dtos/createContact.dto';
import { UpdateContactDto } from './dtos/updateContact.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Roles(Role.SUPERADMIN, Role.ADMIN, Role.SALES)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('add/:companyId')
  async addContact(
    @Param('companyId') companyId: number,
    @Body() createContactDto: CreateContactDto,
  ) {
    return this.contactService.addContact(createContactDto, companyId);
  }

  @Get(':companyId')
  async getContacts(@Param('companyId') companyId: number) {
    return this.contactService.getContacts(companyId);
  }

  @Get(':companyId/:contactId')
  async getContactById(
    @Param('companyId') companyId: number,
    @Param('contactId') contactId: number,
  ) {
    return this.contactService.getContactById(contactId, companyId);
  }

  @Put('update/:companyId/:contactId')
  async updateContact(
    @Param('companyId') companyId: number,
    @Param('contactId') contactId: number,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactService.updateContact(
      contactId,
      companyId,
      updateContactDto,
    );
  }

  @Delete('delete/:companyId/:contactId')
  async deleteContact(
    @Param('companyId') companyId: number,
    @Param('contactId') contactId: number,
  ) {
    return this.contactService.deleteContact(contactId, companyId);
  }
}
