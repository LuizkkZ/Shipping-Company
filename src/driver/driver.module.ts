import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Driver } from './entities/driver.entity';
import { DriverService } from './services/driver.service';
import { DriverController } from './driver.controller';
import { ShippingCompanyModule } from 'src/shipping-company/shipping-company.module';
import { ShippingCompanyService } from 'src/shipping-company/services/shipping-company.service';
import { ShippingCompanyController } from 'src/shipping-company/shipping-company.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Driver]), ShippingCompanyModule],
  controllers: [DriverController],
  providers: [DriverService],
  exports: [DriverService],
})
export class DriverModule {}
