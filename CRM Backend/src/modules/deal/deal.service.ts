import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deal } from 'src/entities/Local Entities/deal.entity';
import { Repository } from 'typeorm';
import { CreateDealDto } from './dtos/createDeal.dto';
import { getRepositoryForCompany } from 'src/utils/companyRepository.util';
import { UpdateDealDto } from './dtos/updateDeal.dto';

@Injectable()
export class DealService {
  constructor(
    @InjectRepository(Deal)
    private readonly dealRepository: Repository<Deal>,
  ) {}

  async addDeal(
    createDealDto: CreateDealDto,
    companyId: number,
  ): Promise<Deal> {
    // Get the repository for the company schema
    const dealRepository = await getRepositoryForCompany(companyId, Deal);

    // Create and save the deal entity
    const deal = dealRepository.create(createDealDto);
    return dealRepository.save(deal);
  }

  async getDeals(companyId: number): Promise<Deal[]> {
    // Get the repository for the company schema
    const dealRepository = await getRepositoryForCompany(companyId, Deal);

    // Fetch all deals for the given company
    const deals = await dealRepository.find({ relations: ['contact'] });

    if (!deals) {
      throw new NotFoundException('Deal not found');
    }
    return deals;
  }

  async getDealById(dealId: number, companyId: number): Promise<Deal> {
    // Get the repository for the company schema
    const dealRepository = await getRepositoryForCompany(companyId, Deal);
    // Find the deal by ID
    const deal = await dealRepository.findOne({
      where: { deal_id: dealId },
      relations: ['contact'],
    });

    if (!deal) {
      throw new NotFoundException('Deal not found');
    }

    return deal;
  }

  async updateDeal(
    companyId: number,
    dealId: number,
    updateDealDto: UpdateDealDto,
  ): Promise<Deal> {
    // Get the repository for the company schema
    const dealRepository = await getRepositoryForCompany(companyId, Deal);

    // Find the existing employee
    const existingDeal = await dealRepository.findOne({
      where: { deal_id: dealId },
    });

    if (!existingDeal) {
      throw new NotFoundException('Employee not found');
    }

    // Merge the updated data into the existing employee
    const updatedDeal = dealRepository.merge(existingDeal, updateDealDto);

    // Save and return the updated employee
    return dealRepository.save(updatedDeal);
  }

  async deleteDeal(companyId: number, dealId: number): Promise<void> {
    // Get the repository for the company schema
    const dealRepository = await getRepositoryForCompany(companyId, Deal);

    // Find the employee
    const deal = await dealRepository.findOne({
      where: { deal_id: dealId },
    });

    if (!deal) {
      throw new NotFoundException('Deal not found');
    }

    // Remove the employee
    await dealRepository.remove(deal);
  }
}
