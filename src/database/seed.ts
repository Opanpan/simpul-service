import { DataSource } from 'typeorm';
import { UserSeeder } from './seeds/UserSeeder';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'simpuldb',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.{js,ts}'],
  synchronize: false,
  logging: true,
});

async function seed() {
  try {
    await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    await UserSeeder.run(AppDataSource);
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
