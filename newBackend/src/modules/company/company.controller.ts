import { Body, Controller, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dtos/createCompany.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post('create')
  async createCompany(@Body() createCompanyDTO: CreateCompanyDto) {
    return this.companyService.addCompany(createCompanyDTO);
  }
}
