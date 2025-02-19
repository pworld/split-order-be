// src/database/seed.ts
import { AppDataSource } from '../config/ormconfig';
import { CourierCharge } from '../entities/CourierCharge';
import { Product } from '../entities/Product';
import { weightChargeData } from './seedData';
import { itemData } from './seedData';

export const seedDatabase = async () => {
  // Initialize the database connection
  await AppDataSource.initialize();

  // Seed CourierCharge data
  const courierChargesRepository = AppDataSource.getRepository(CourierCharge);
  for (const data of weightChargeData) {
    const charge = courierChargesRepository.create(data);
    await courierChargesRepository.save(charge);
  }

  // Seed Item data
  const productRepository = AppDataSource.getRepository(Product);
  for (const data of itemData) {
    const item = productRepository.create(data);
    await productRepository.save(item);
  }

  console.log('Database seeded successfully!');
};

// Run the seed function
seedDatabase()
  .catch((error) => {
    console.error('Error seeding database:', error);
  })
  .finally(() => {
    AppDataSource.destroy();
  });