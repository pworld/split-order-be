import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CourierCharge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  low: number;

  @Column('int')
  high: number;

  @Column('int')
  charge: number;
  
}
