import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../../entities/Global Entities/company.entity';
import { CompanySetupService } from 'src/common/companySchemaSetup';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [CompanyService, CompanySetupService],
})
export class CompanyModule {}
