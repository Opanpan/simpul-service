import { DataSource } from 'typeorm';
import { UserSeeder } from './UserSeeder';

export async function runSeeders(dataSource: DataSource): Promise<void> {
  try {
    await UserSeeder.run(dataSource);
  } catch (error) {
    throw error;
  }
}
