import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaxService } from 'src/tax/services/tax.service';
import { Repository, QueryFailedError } from 'typeorm';
import { ShippingCompany } from '../entities/shipping-company.entity';
import { CreateShippingCompanyDto } from './../dto/create-shipping-company.dto';
import { UpdateShippingCompanyDto } from './../dto/update-shipping-company.dto';
ShippingCompany;

@Injectable()
export class ShippingCompanyService {
  constructor(
    @InjectRepository(ShippingCompany)
    private readonly shippingCompanyRepository: Repository<ShippingCompany>,
    private readonly taxService: TaxService,
  ) {}

  create(createShippingCompanyDto: CreateShippingCompanyDto) {
    const taxExists = this.taxService.findOne(createShippingCompanyDto.idTax);

    if (!taxExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Tax id ${createShippingCompanyDto.idTax} does not exist`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.shippingCompanyRepository.save(createShippingCompanyDto);
  }

  findAll() {
    return this.shippingCompanyRepository.find();
  }

  async findOne(id: string) {
    try {
      const company = await this.shippingCompanyRepository.findOneByOrFail({
        id,
      });
      return company;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Shipping company not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, updateShippingCompanyDto: UpdateShippingCompanyDto) {
    const company = await this.shippingCompanyRepository.findOneByOrFail({
      id,
    });
    if (!company) {
      throw new Error('Tax not found');
    }
    company.name = updateShippingCompanyDto.name;
    company.cnpj = updateShippingCompanyDto.cnpj;
    company.phone = updateShippingCompanyDto.phone;
    company.email = updateShippingCompanyDto.email;
    company.idTax = updateShippingCompanyDto.idTax;

    return this.shippingCompanyRepository.save(company);
  }

  async delete(id: string) {
    try {
      const company = await this.shippingCompanyRepository.delete({ id });
      return company;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const newErro = new QueryFailedError('', [], error);
        console.log(newErro.driverError.detail);

        const table = newErro.driverError.table;

        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Shipping Company id ${id} cannot be deleted as it is being used in ${table}`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }
}
