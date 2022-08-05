import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { VehicleType } from './entities/vehicle-type.entity';
import { VehicleTypeService } from './services/vehicle-type.service';
import { VehicleTypeController } from './vehicle-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleType])],
  controllers: [VehicleTypeController],
  providers: [VehicleTypeService],
  exports: [VehicleTypeService],
})
export class VehicleTypeModule {}
