import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CourierCharges {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  weight: number;

  @Column('int')
  Charge: number;
  
}
