import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../../entities/Global Entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dtos/createCompany.dto';
import { CompanySetupService } from 'src/common/companySchemaSetup';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private companySetupService: CompanySetupService,
  ) {}

  // for creating a company
  async addCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    // Hash the password before creating the company
    if (createCompanyDto.password) {
      const saltRounds = 10; // You can adjust this based on security requirements
      createCompanyDto.password = await bcrypt.hash(
        createCompanyDto.password,
        saltRounds,
      );
    }

    const newCompany = this.companyRepository.create(createCompanyDto);
    const savedCompany = await this.companyRepository.save(newCompany);
    // Step 2: Dynamically create a schema for the company
    await this.companySetupService.createCompanySchema(savedCompany.company_id);

    // Step 4: Return the DTO (optional, can be customized)
    return savedCompany;
  }
}
