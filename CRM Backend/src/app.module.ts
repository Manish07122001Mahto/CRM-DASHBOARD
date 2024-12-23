import { Module } from '@nestjs/common';
import { envConfig } from './config/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './modules/company/company.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { DealModule } from './modules/deal/deal.module';
import { ContactModule } from './modules/contact/contact.module';
import { ActivityModule } from './modules/activity/activity.module';

@Module({
  imports: [
    envConfig,
    TypeOrmModule.forRoot(databaseConfig),
    CompanyModule,
    EmployeeModule,
    AuthModule,
    DealModule,
    ContactModule,
    ActivityModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
