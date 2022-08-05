import { Driver } from '../../driver/entities/driver.entity';
import { VehicleType } from '../../vehicle-type/entities/vehicle-type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'VEHICLE' })
export class Vehicle {
  @PrimaryGeneratedColumn('uuid', { name: 'ID_VEHICLE' })
  id?: string;

  @Column({ name: 'ID_DRIVER', type: 'uuid' })
  idDriver: string;

  @Column({ name: 'ID_VEHICLE_TYPE', type: 'uuid' })
  idVehicleType: string;

  @Column({ name: 'LICENSE_PLATE' })
  licensePlate: string;

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

  @ManyToMany(() => Driver, (driver) => driver.id)
  @JoinColumn({ name: 'ID_DRIVER' })
  driver: Driver;

  @OneToMany(() => VehicleType, (vehicleType) => vehicleType.id)
  @JoinColumn({ name: 'ID_VEHICLE_TYPE' })
  vehicleType: VehicleType;
}