import { Product } from '../entities/Product';
import { In, Repository } from 'typeorm';
import { AppDataSource } from '../config/ormconfig';

export interface ProductRepository {
  getProducts(): Promise<Product[]>;
  getItemsByIds(ids: number[]): Promise<Product[]>;
  setProduct(item: Partial<Product>): Promise<Product>;
  updateProduct(id: number, item: Partial<Product>): Promise<Product | null>;
  deleteProduct(id: number): Promise<boolean>;
}

export class ProductRepositoryImpl implements ProductRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async getProducts(): Promise<Product[]> {
    return this.repository.find( {
      order: {
        id: 'DESC', // Order by ID in descending order
      },
    });
  }

  async getItemsByIds(ids: number[]): Promise<Product[]> {
    return this.repository.find({
      where: { id: In(ids) }, // Use TypeORM's In operator to find items by IDs
    });
  }
  
  async setProduct(item: Partial<Product>): Promise<Product> {
    const newItem = this.repository.create(item);
    await this.repository.save(newItem);
    return newItem;
  }

  async updateProduct(id: number, item: Partial<Product>): Promise<Product | null> {
    const existingItem = await this.repository.findOneBy({ id }); // Find the item by ID
    if (!existingItem) {
      return null; // If the item doesn't exist, return null
    }

    // Merge the new data into the existing item
    const updatedItem = this.repository.merge(existingItem, item);
    await this.repository.save(updatedItem); // Save the updated item to the database
    return updatedItem;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return !!result.affected; // if error or null handle
  }
}
