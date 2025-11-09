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
    // Increase connection timeout
    connectionTimeoutMillis: 30000, // 30 seconds
    query_timeout: 30000,
    statement_timeout: 30000,
    // Connection pool settings
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  },
});
