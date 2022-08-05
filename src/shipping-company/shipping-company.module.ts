import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ShippingCompany } from './entities/shipping-company.entity';
import { ShippingCompanyService } from './services/shipping-company.service';
import { ShippingCompanyController } from './shipping-company.controller';
import { TaxModule } from '../tax/tax.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingCompany]), TaxModule],
  controllers: [ShippingCompanyController],
  providers: [ShippingCompanyService],
  exports: [ShippingCompanyService],
})
export class ShippingCompanyModule {}
