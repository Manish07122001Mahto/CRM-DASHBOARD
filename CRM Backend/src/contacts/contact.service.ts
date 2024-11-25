import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContactDto, UpdateContactDto } from 'src/dto/contact.dto';
import { Contact } from 'src/entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) // Inject Contact repository to interact with the DB
    private contactRepository: Repository<Contact>,
  ) {}

  async addContact(createUserDto: CreateContactDto): Promise<Contact> {
    const newUser = this.contactRepository.create(createUserDto); // Map DTO to entity
    return await this.contactRepository.save(newUser); // Save to DB
  }

  async findAll(query: any): Promise<Contact[]> {
    return await this.contactRepository.find({ where: query });
  }

  async findOne(id: number): Promise<Contact> {
    return await this.contactRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    const contact = await this.contactRepository.findOne({ where: { id } });
    if (!contact) {
      throw new Error(`Contact with ID ${id} not found.`);
    }
    Object.assign(contact, updateContactDto);
    return await this.contactRepository.save(contact);
  }

  async delete(id: number): Promise<{ message: string }> {
    const result = await this.contactRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Contact with ID ${id} not found.`);
    }
    return { message: `Contact with ID ${id} deleted successfully.` };
  }
}
