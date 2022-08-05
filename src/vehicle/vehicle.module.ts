import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleService } from './services/vehicle.service';
import { VehicleController } from './vehicle.controller';
import { DriverModule } from '../driver/driver.module';
import { VehicleTypeModule } from '../vehicle-type/vehicle-type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle]),
    DriverModule,
    VehicleTypeModule,
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
  exports: [VehicleService],
})
export class VehicleModule {}
