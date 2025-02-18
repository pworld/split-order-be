import 'dotenv/config';
import { AppDataSource } from '../config/ormconfig';

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};
