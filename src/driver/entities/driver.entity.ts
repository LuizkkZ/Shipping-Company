import { ShippingCompany } from 'src/shipping-company/entities/shipping-company.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'DRIVER' })
export class Driver {
  @PrimaryGeneratedColumn('uuid', { name: 'ID_DRIVER' })
  id?: string;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'CNH' })
  cnh: string;

  @Column('uuid', { name: 'ID_SHIPPING_COMPANY' })
  idShippingCompany: string;

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

  @OneToMany(() => ShippingCompany, (shippingCompany) => shippingCompany.id)
  @JoinColumn({ name: 'ID_SHIPPING_COMPANY' })
  shippingCompany: ShippingCompany;
}
