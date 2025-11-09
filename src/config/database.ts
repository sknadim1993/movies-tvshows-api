import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Entry } from '../entities/Entry';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true, // Set to false in production, use migrations instead
  logging: process.env.NODE_ENV === 'development',
  entities: [Entry],
  migrations: ['src/migrations/**/*.ts'],
  extra: {
    ssl: {
      rejectUnauthorized: false, // ✅ Fix for Supabase + TypeORM 0.3.x
    },
  },
});
