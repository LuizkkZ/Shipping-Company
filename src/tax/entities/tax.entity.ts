import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TAX' })
export class Tax {
  @PrimaryGeneratedColumn('uuid', { name: 'ID_TAX' })
  id?: string;

  @Column({ name: 'ADDRESSEE' })
  addressee: string;

  @Column({ name: 'LOCATION' })
  location: string;

  @Column({ name: 'KILOMETERS' })
  kilometers: number;

  @Column({ name: 'LOAD_WEIGTH' })
  loadWeigth: number;

  @Column({ name: 'SHIPPING_STATUS', default: 0 })
  shippingStatus: number;

  @Column({ name: 'SHIPPING_AMOUNT' })
  shippingAmount: number;

  @Column({
    name: 'CREATED_AT',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'UPDATED_AT',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;
}
