import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';
import { ShippingCompanyService } from './services/shipping-company.service';
import { CreateShippingCompanyDto } from './dto/create-shipping-company.dto';
import { UpdateShippingCompanyDto } from './dto/update-shipping-company.dto';

@Controller('shipping-company')
export class ShippingCompanyController {
  constructor(private readonly shippingCompanyService: ShippingCompanyService) {}

  @Post()
  create(@Body() createShippingCompanyDto: CreateShippingCompanyDto) {
    return this.shippingCompanyService.create(createShippingCompanyDto);
  }

  @Get()
  findAll() {
    return this.shippingCompanyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingCompanyService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateShippingCompanyDto: UpdateShippingCompanyDto) {
    return this.shippingCompanyService.update(id, updateShippingCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.shippingCompanyService.delete(id);

    if (deleted) {
      return {
        message: `Shipping company with id ${id} has been deleted.`,
        HttpCode: HttpStatus.OK,
      };
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
