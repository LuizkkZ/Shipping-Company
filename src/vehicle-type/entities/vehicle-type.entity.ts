import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'VEHICLE_TYPE' })
export class VehicleType {
  @PrimaryGeneratedColumn('uuid', { name: 'ID_VEHICLE_TYPE' })
  id?: string;

  @Column({ name: 'TOTAL_CAPACITY' })
  totalCapacity: number;

  @Column({ name: 'TRUNK_HEIGTH' })
  trunkHeigth: number;

  @Column({ name: 'TRUNK_WIDTH' })
  trunkWidth: number;

  @Column({ name: 'TRUNK_LENGTH' })
  trunkLength: number;

  @Column({ name: 'TOTAL_VEHICLE_WEIGTH' })
  totalVehicleWeight: number;

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
