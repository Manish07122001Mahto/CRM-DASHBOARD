import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(companyId: string, loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;

    // Step 1: Search for the user in the global `companies` table
    const companyUser = await this.dataSource.query(
      'SELECT * FROM companies WHERE email = $1 LIMIT 1',
      [email],
    );

    if (companyUser.length > 0) {
      // User found in the global company table
      const isPasswordValid = await bcrypt.compare(
        password,
        companyUser[0].password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials.');
      }

      // Generate token for company-level user
      const payload: JwtPayload = {
        email: companyUser[0].email,
        companyId: 'global',
      };
      return this.jwtService.sign(payload);
    }

    // Step 2: Search for the user in the company-specific schema's `employees` table
    const companySchema = `company_${companyId}_Schema`;
    const employee = await this.dataSource.query(
      `SELECT * FROM "${companySchema}".employees WHERE email = $1 LIMIT 1`,
      [email],
    );

    if (!employee || employee.length === 0) {
      // User not found in either table
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Validate the password for the employee
    const isPasswordValid = await bcrypt.compare(
      password,
      employee[0].password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Generate token for employee-level user
    const payload: JwtPayload = {
      email: employee[0].email,
      companyId,
    };
    return this.jwtService.sign(payload);
  }
}
