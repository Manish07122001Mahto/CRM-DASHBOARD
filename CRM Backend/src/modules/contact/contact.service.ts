import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/entities/Local Entities/contact.entity';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dtos/createContact.dto';
import { getRepositoryForCompany } from 'src/utils/companyRepository.util';
import { UpdateContactDto } from './dtos/updateContact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async addContact(
    createContactDto: CreateContactDto,
    companyId: number,
  ): Promise<Contact> {
    // Get the repository for the company schema
    const contactRepository = await getRepositoryForCompany(companyId, Contact);

    // Create and save the Contact entity
    const contact = contactRepository.create(createContactDto);
    return contactRepository.save(contact);
  }

  async getContacts(companyId: number): Promise<Contact[]> {
    // Get the repository for the company schema
    const contactRepository = await getRepositoryForCompany(companyId, Contact);
    // Find the Contact by ID
    const contacts = await contactRepository.find();
    if (!contacts) {
      throw new NotFoundException('Contact not found');
    }
    return contacts;
  }

  async getContactById(contactId: number, companyId: number): Promise<Contact> {
    // Get the repository for the company schema
    const contactRepository = await getRepositoryForCompany(companyId, Contact);
    // Find the contact by ID
    const contact = await contactRepository.findOne({
      where: { contact_id: contactId },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return contact;
  }

  async updateContact(
    contactId: number,
    companyId: number,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    // Get the repository for the company schema
    const contactRepository = await getRepositoryForCompany(companyId, Contact);

    // Find the existing Contact
    const existingContact = await contactRepository.findOne({
      where: { contact_id: contactId },
    });

    if (!existingContact) {
      throw new NotFoundException('Contact not found');
    }

    // Merge the updated data into the existing Contact
    const updatedContact = contactRepository.merge(
      existingContact,
      updateContactDto,
    );

    // Save and return the updated Contact
    return contactRepository.save(updatedContact);
  }

  async deleteContact(contactId: number, companyId: number): Promise<void> {
    // Get the repository for the company schema
    const contactRepository = await getRepositoryForCompany(
      companyId,
      Contact,
    );

    // Find the contact
    const contact = await contactRepository.findOne({
      where: { contact_id: contactId },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    // Remove the contact
    await contactRepository.remove(contact);
  }
}
