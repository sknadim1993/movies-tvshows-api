import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Entry } from '../entities/Entry';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
  entities: [Entry],
  migrations: ['src/migrations/**/*.ts'],
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    max: 10,
    connectionTimeoutMillis: 10000,  // Only once!
    idleTimeoutMillis: 30000,
  },
});
