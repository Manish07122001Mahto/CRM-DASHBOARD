import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dtos/createCompany.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post('create')
  async createCompany(@Body() createCompanyDTO: CreateCompanyDto) {
    return this.companyService.addCompany(createCompanyDTO);
  }

  @Roles(Role.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update/:id')
  async updateCompany(
    @Param('id') companyId: number,
    @Body() updateData: Partial<CreateCompanyDto>,
  ) {
    return this.companyService.updateCompany(companyId, updateData);
  }

  @Get('find/:id')
  async findCompanyById(@Param('id') companyId: number) {
    return this.companyService.findCompanyById(companyId);
  }
  @Roles(Role.SUPERADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:id')
  async deleteCompany(@Param('id') companyId: number) {
    await this.companyService.deleteCompany(companyId);
    return { message: 'Company deleted successfully' };
  }
}
