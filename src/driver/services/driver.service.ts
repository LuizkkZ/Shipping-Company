import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Driver } from '../entities/driver.entity';
import { ShippingCompanyService } from '../../shipping-company/services/shipping-company.service';
import { CreateDriverDto } from './../dto/create-driver.dto';
import { UpdateDriverDto } from './../dto/update-driver.dto';
Driver;

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    private readonly shippingCompanyService: ShippingCompanyService,
  ) {}

  create(createDriverDto: CreateDriverDto) {
    const shippingCompanyExists = this.shippingCompanyService.findOne(createDriverDto.idShippingCompany);

    if (!shippingCompanyExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Shipping company id ${createDriverDto.idShippingCompany} does not exist`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
   
    return this.driverRepository.save(createDriverDto);
  }

  findAll() {
    return this.driverRepository.find();
  }

  async findOne(id: string) {
    try {
      const driver = await this.driverRepository.findOneByOrFail({
        id,
      });
      return driver;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Driver not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    const driver = await this.driverRepository.findOneByOrFail({ id });
    if (!driver) {
      throw new Error('Driver not found');
    }
    driver.name = updateDriverDto.name;
    driver.cnh = updateDriverDto.cnh;
    driver.idShippingCompany = updateDriverDto.idShippingCompany;

    return this.driverRepository.save(driver);
  }

  async delete(id: string) {
    try {
      const driver = await this.driverRepository.delete({ id });
      return driver;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const newErro = new QueryFailedError('', [], error);
        console.log(newErro.driverError.detail);

        const table = newErro.driverError.table;

        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Driver id ${id} cannot be deleted as it is being used in ${table}`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }
}
