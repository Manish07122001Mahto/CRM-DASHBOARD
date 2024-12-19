// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the request
      secretOrKey: 'testingCrm', // Secret key used for signing tokens
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const { email, companyId } = payload;

    // Step 1: Validate against global `companies` table if `companyId` is 'global'
    if (companyId === 'global') {
      const companyUser = await this.dataSource.query(
        'SELECT * FROM companies WHERE email = $1 LIMIT 1',
        [email],
      );

      if (!companyUser) {
        throw new UnauthorizedException('Global user not found.');
      }
      
      return {
        email: companyUser[0].email,
        role: companyUser[0].role,
        companyId: 'global',
      };
    }

    // Step 2: Validate against company-specific schema for local users
    const companySchema = `company_${companyId}_Schema`;
    const employee = await this.dataSource.query(
      `SELECT * FROM "${companySchema}".employees WHERE email = $1 LIMIT 1`,
      [email],
    );

    if (!employee) {
      throw new UnauthorizedException('Local user not found.');
    }

    return {
      email: employee[0].email,
      role: employee[0].role,
      companyId,
    };
  }
}
