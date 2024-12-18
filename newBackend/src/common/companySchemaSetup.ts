import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class CompanySetupService {
  constructor(
    @InjectDataSource() private connection: DataSource, // Injecting the connection to work with raw queries
  ) {}

  // Method to create a new schema for the company
  async createCompanySchema(companyId: number): Promise<void> {
    const schemaName = `company_${companyId}_Schema`; // Define schema name based on company ID

    // Step 1: Create the schema dynamically
    await this.connection.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
  }
}
