import { Tax } from 'src/tax/entities/tax.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'SHIPPING_COMPANY' })
export class ShippingCompany {
  @PrimaryGeneratedColumn('uuid', { name: 'ID_SHIPPING_COMPANY' })
  id?: string;

  @Column({ name: 'ID_TAX', type: 'uuid' })
  idTax: string;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'CNPJ' })
  cnpj: string;

  @Column({ name: 'PHONE' })
  phone: string;

  @Column({ name: 'EMAIL' })
  email: string;

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

  @OneToMany(() => Tax, (tax) => tax.id)
  @JoinColumn({ name: 'ID_TAX' })
  tax: Tax;
}
