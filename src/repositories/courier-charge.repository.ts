import { CourierCharge } from '../entities/CourierCharge';
import { In, Repository } from 'typeorm';
import { AppDataSource } from '../config/ormconfig';

export interface CourierChargeRepository {
  getCourierCharges(): Promise<CourierCharge[]>;
  setCourierCharge(item: Partial<CourierCharge>): Promise<CourierCharge>;
}

export class CourierChargeRepositoryImpl implements CourierChargeRepository {
  private repository: Repository<CourierCharge>;

  constructor() {
    this.repository = AppDataSource.getRepository(CourierCharge);
  }

  async getCourierCharges(): Promise<CourierCharge[]> {
    return this.repository.find();
  }
  
  async setCourierCharge(item: Partial<CourierCharge>): Promise<CourierCharge> {
    const newItem = this.repository.create(item);
    await this.repository.save(newItem);
    return newItem;
  }

}
