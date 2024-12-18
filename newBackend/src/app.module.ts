import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envConfig } from './config/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { CompanyModule } from './modules/company/company.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    envConfig,
    TypeOrmModule.forRoot(databaseConfig),
    CompanyModule,
    EmployeeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
