import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverModule } from './driver/driver.module';
import { ShippingCompanyModule } from './shipping-company/shipping-company.module';
import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';
import { TaxModule } from './tax/tax.module';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService) => ({
        type: 'postgres',
        host: configService.get('TYPEORM_HOST'),
        database: configService.get('TYPEORM_DATABASE'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        port: Number(configService.get('TYPEORM_PORT', 5432)),
        entities: [__dirname + '/**/*.entity.js'],
        migrations: ['database/migrations/*.ts'],
        synchronize: configService.get('TYPEORM_SYNCHRONIZE') === 'true',
        logging: configService.get('TYPEORM_LOGGING') === 'true',
      }),
    }),
    DriverModule,
    ShippingCompanyModule,
    VehicleTypeModule,
    TaxModule,
    VehicleModule,
  ],
  controllers: [],
})
export class AppModule {}
