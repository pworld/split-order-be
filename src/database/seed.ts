import { AppDataSource } from '../config/ormconfig';
import { Item } from '../entities/Product';

export const seedDatabase = async () => {
  const itemRepository = AppDataSource.getRepository(Item);

  const items = [
    { name: 'Item 1', price: 100, weight: 200 },
    { name: 'Item 2', price: 50, weight: 300 },
    { name: 'Item 3', price: 120, weight: 150 },
    { name: 'Item 4', price: 80, weight: 400 },
    { name: 'Item 5', price: 90, weight: 250 },
  ];

  for (const itemData of items) {
    const item = itemRepository.create(itemData);
    await itemRepository.save(item);
  }

  console.log('Database seeded successfully!');
};
