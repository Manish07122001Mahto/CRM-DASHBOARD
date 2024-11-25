import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig } from './config/env.config';
import { databaseConfig } from './config/database.config';
import { ContactModule } from './contacts/contact.module';

@Module({
  imports: [
    envConfig, // Use the envConfig to load .env variables globally
    TypeOrmModule.forRoot(databaseConfig),
    ContactModule, // Set up TypeORM with the configuration from database.config.ts
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
