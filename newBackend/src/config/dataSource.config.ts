import { DataSource, DataSourceOptions } from 'typeorm';

const connections: { [key: number]: DataSource } = {};

export const createCompanyDataSource = async (companyId: number): Promise<DataSource> => {
  if (!connections[companyId]) {
    const connectionOptions: DataSourceOptions = {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Manish@2001',
      database: 'CRM-DB',
      synchronize: true,
      schema: `company_${companyId}_Schema`,
      entities: [__dirname + '/../entities/Local Entities/*.entity{.ts,.js}'],
    };

    const dataSource = new DataSource(connectionOptions);
    await dataSource.initialize();
    connections[companyId] = dataSource;
  }

  return connections[companyId];
};
