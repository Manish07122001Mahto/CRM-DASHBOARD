// src/deals/deal.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deal } from 'src/entities/deal.entity';
import { CreateDealDto, UpdateDealDto } from 'src/dto/deal.dto';

@Injectable()
export class DealService {
  constructor(
    @InjectRepository(Deal) private readonly dealRepository: Repository<Deal>,
  ) {}

  // Create a new deal associated with a specific contact
  async create(contactId: number, createDealDto: CreateDealDto): Promise<Deal> {
    const newDeal = this.dealRepository.create({
      ...createDealDto,
      contact: { id: contactId }, // Set the FK relation
    });
    return this.dealRepository.save(newDeal);
  }

  // Retrieve all deals
  async findAll(): Promise<Deal[]> {
    return this.dealRepository.find({ relations: ['contact'] });
  }

  // Retrieve all deals for a specific contact
  async findAllForSpecificContact(contactId: number): Promise<Deal[]> {
    return this.dealRepository.find({
      where: { contact: { id: contactId } },
      relations: ['contact'],
    });
  }

  // Retrieve a single deal by ID
  async findOne(id: number): Promise<Deal> {
    const deal = await this.dealRepository.findOne({
      where: { id },
      relations: ['contact'],
    });
    if (!deal) {
      throw new NotFoundException(`Deal with ID ${id} not found.`);
    }
    return deal;
  }

  // Update a deal by ID
  async updateDeal(id: number, updateDealDto: UpdateDealDto): Promise<Deal> {
    const deal = await this.findOne(id); // Ensure the deal exists
    Object.assign(deal, updateDealDto); // Update the existing deal
    return this.dealRepository.save(deal);
  }

  // Delete a deal by ID
  async deleteDeal(id: number): Promise<void> {
    const result = await this.dealRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Deal with ID ${id} not found.`);
    }
  }
}
