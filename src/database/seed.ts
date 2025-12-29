import { DataSource } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { ConversationRead } from '../chat/entities/conversation-read.entity';
import { Conversation } from '../chat/entities/conversation.entity';
import { Message } from '../chat/entities/message.entity';
import { User } from '../chat/entities/user.entity';
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
