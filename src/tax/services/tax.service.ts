import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Tax } from '../entities/tax.entity';
import { CreateTaxDto } from './../dto/create-tax.dto';
import { UpdateTaxDto } from './../dto/update-tax.dto';
Tax;

@Injectable()
export class TaxService {
  constructor(
    @InjectRepository(Tax)
    private readonly taxRepository: Repository<Tax>,
  ) {}

  create(createTaxDto: CreateTaxDto) {
    
    return this.taxRepository.save(createTaxDto);
  }

  findAll() {
    return this.taxRepository.find();
  }

  async findOne(id: string) {
    try {
      const tax = await this.taxRepository.findOneByOrFail({
        id,
      });
      return tax;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'tax not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateTaxDto: UpdateTaxDto) {
    const tax = await this.taxRepository.findOneByOrFail({ id });
    if (!tax) {
      throw new Error('Tax not found');
    }
    tax.addressee = updateTaxDto.addressee;
    tax.location = updateTaxDto.location;
    tax.kilometers = updateTaxDto.kilometers;
    tax.loadWeigth = updateTaxDto.loadWeigth;
    tax.shippingStatus = updateTaxDto.shippingStatus;
    tax.shippingAmount = updateTaxDto.shippingAmount;

    return this.taxRepository.save(tax);
  }

  async delete(id: string) {
    try {
      const tax = await this.taxRepository.delete({ id });
      return tax;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const newErro = new QueryFailedError('', [], error);
        console.log(newErro.driverError.detail);

        const table = newErro.driverError.table;

        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Tax id ${id} cannot be deleted as it is being used in ${table}`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }
}
