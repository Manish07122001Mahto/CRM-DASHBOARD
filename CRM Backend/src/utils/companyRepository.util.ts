// Function for finding or creating company specific repository.

import { Repository } from 'typeorm';
import { createCompanyDataSource } from 'src/config/dataSource.config';

export async function getRepositoryForCompany<T>(
  companyId: number,
  entity: new () => T,
): Promise<Repository<T>> {
  const companyDataSource = await createCompanyDataSource(companyId);
  return companyDataSource.getRepository(entity);
}
