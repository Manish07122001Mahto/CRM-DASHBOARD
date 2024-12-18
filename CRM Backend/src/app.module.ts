import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig } from './config/env.config';
import { databaseConfig } from './config/database.config';
import { ContactModule } from './contacts/contact.module';
import { ActivityModule } from './activity/activity.module';
import { DealModule } from './deal/deal.module';


@Module({
  imports: [
    envConfig, // Use the envConfig to load .env variables globally
    TypeOrmModule.forRoot(databaseConfig),
    ContactModule,
    ActivityModule,
    DealModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
