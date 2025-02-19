import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/product.repository';
import { CourierChargeRepository } from '../repositories/courier-charge.repository';
import { Package, splitItemsIntoPackages } from '../utils/package-splitting';

export class ProductService {

  constructor(
    private ProductRepository: ProductRepository,
    private CourierChargeRepository: CourierChargeRepository,
  ) {}

  async getProducts(): Promise<Product[]> {
    return await this.ProductRepository.getProducts();
  }

  async setProduct(product: Product): Promise<Product> {
    return await this.ProductRepository.setProduct(product);
  }

  async updateProduct(product: Product): Promise<Product | null> {
    const id = product.id
    return await this.ProductRepository.updateProduct(id, product);
  }

  async deleteProduct(id:number): Promise<Boolean> {
    return await this.ProductRepository.deleteProduct(id);
  }

  async countCharges(selected_items_ids: number[]): Promise<Package[]> {

    // get Courier Charges
    const courier_charge = await this.CourierChargeRepository.getCourierCharges();

    // Get Product from database
    const all_items = await this.ProductRepository.getItemsByIds(selected_items_ids, );

    const selected_items = splitItemsIntoPackages(all_items, courier_charge);

    return selected_items;
  }
}
