import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST, // Host where the PostgreSQL server is running
  port: parseInt(process.env.DB_PORT, 10), // Default PostgreSQL port:5432
  username: process.env.DB_USERNAME, // Default user: 'postgres'
  password: process.env.DB_PASSWORD, // Your database password
  database: process.env.DB_NAME, // Database name
  synchronize: true, // Enable auto schema synchronization (set to false in production)
  entities: [__dirname + '/../entities/Global Entities/*.entity{.ts,.js}'],
};
