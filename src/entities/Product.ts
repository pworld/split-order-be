import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  weight: number;

  // For future used if status is_checked needed for package selections
  @Column('boolean', { default: false })
  is_checked: boolean;
}
