import { Product } from '../entities/Product';
import { CourierCharges } from '../entities/CourierCharges';
import { ProductRepository } from '../repositories/product.repository';
import { splitItemsIntoPackages } from '../utils/package-splitting';

export class OrderService {
  constructor(private ProductRepository: ProductRepository) {}

  async getProducts(): Promise<Product[]> {
    return await this.ProductRepository.getProducts();
  }

  async setProduct(Product: Product): Promise<Product> {
    return await this.ProductRepository.setProduct(Product);
  }

  async updateProduct(Product: Product): Promise<Product | null> {
    const id = Product.id
    return await this.ProductRepository.updateProduct(id, Product);
  }

  async deleteProduct(id:number): Promise<Boolean> {
    return await this.ProductRepository.deleteProduct(id);
  }

  async countCharges(selectedItemIds: number[]): Promise<CourierCharges[]> {
    const allItems = await this.ProductRepository.getItemsByIds(selectedItemIds);
    // return splitItemsIntoPackages(selectedItems);
  }
}
