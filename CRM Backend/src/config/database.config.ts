// This file is responsible for the Postgres DB connection and TypeORM Settings

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DB_URL, // Use environment variable from .env
  synchronize: true, // Auto-create tables in development (disable in production)
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Path to entities
};
