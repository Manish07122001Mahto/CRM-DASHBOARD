import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContactDto, UpdateContactDto } from 'src/dto/contact.dto';
import { Contact } from 'src/entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) // Inject Contact repository to interact with the DB
    private userRepository: Repository<Contact>,
  ) {}

  async addContact(createUserDto: CreateContactDto): Promise<Contact> {
    const newUser = this.userRepository.create(createUserDto); // Map DTO to entity
    return await this.userRepository.save(newUser); // Save to DB
  }

  async findAll(query: any): Promise<Contact[]> {
    return await this.userRepository.find({ where: query });
  }

  async findOne(id: number): Promise<Contact> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    const contact = await this.userRepository.findOne({ where: { id } });
    if (!contact) {
      throw new Error(`Contact with ID ${id} not found.`);
    }
    Object.assign(contact, updateContactDto);
    return await this.userRepository.save(contact);
  }

  async delete(id: number): Promise<{ message: string }> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Contact with ID ${id} not found.`);
    }
    return { message: `Contact with ID ${id} deleted successfully.` };
  }
}
