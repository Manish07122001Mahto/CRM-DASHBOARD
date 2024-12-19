import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../../entities/Global Entities/company.entity';
import { CreateCompanyDto } from './dtos/createCompany.dto';
import { CompanySetupService } from 'src/common/companySchemaSetup';
import * as bcrypt from 'bcrypt';
import { UpdateCompanyDto } from './dtos/updateCompany.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private companySetupService: CompanySetupService,
  ) {}

  // Create a new company
  async addCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    // Check if email already exists
    const existingCompany = await this.companyRepository.findOne({
      where: { email: createCompanyDto.email },
    });
    if (existingCompany) {
      throw new Error('Company already exists');
    }

    if (createCompanyDto.password) {
      const saltRounds = 10;
      createCompanyDto.password = await bcrypt.hash(
        createCompanyDto.password,
        saltRounds,
      );
    }

    const newCompany = this.companyRepository.create(createCompanyDto);
    const savedCompany = await this.companyRepository.save(newCompany);
    await this.companySetupService.createCompanySchema(savedCompany.company_id);

    return savedCompany;
  }

  // Update an existing company
  async updateCompany(
    companyId: number,
    updateData: UpdateCompanyDto, // Use UpdateCompanyDto instead of Partial<CreateCompanyDto>
  ): Promise<Company> {
    const existingCompany = await this.companyRepository.findOne({
      where: { company_id: companyId },
    });

    if (!existingCompany) {
      throw new Error('Company not found');
    }

    // Check if the updated email is unique
    if (updateData.email && updateData.email !== existingCompany.email) {
      const emailInUse = await this.companyRepository.findOne({
        where: { email: updateData.email },
      });
      if (emailInUse) {
        throw new Error('Email is already in use');
      }
    }

    // If the password is being updated, hash it
    if (updateData.password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }

    // Apply the updates to the existing company record
    Object.assign(existingCompany, updateData);

    // Save and return the updated company
    return this.companyRepository.save(existingCompany);
  }

  // Find a company by ID
  async findCompanyById(companyId: number): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { company_id: companyId },
    });
    if (!company) {
      throw new Error('Company not found');
    }
    return company;
  }

  // Delete a company
  async deleteCompany(companyId: number): Promise<void> {
    const company = await this.companyRepository.findOne({
      where: { company_id: companyId },
    });
    if (!company) {
      throw new Error('Company not found');
    }
    // Delete the company schema
    await this.companySetupService.deleteCompanySchema(companyId);

    // Finally, delete the company record
    await this.companyRepository.remove(company);
  }
}
