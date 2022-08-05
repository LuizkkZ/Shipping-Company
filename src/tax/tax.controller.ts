import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';
import { TaxService } from './services/tax.service';
import { CreateTaxDto } from './dto/create-tax.dto';
import { UpdateTaxDto } from './dto/update-tax.dto';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post()
  create(@Body() createTaxDto: CreateTaxDto) {
    return this.taxService.create(createTaxDto);
  }

  @Get()
  findAll() {
    return this.taxService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaxDto: UpdateTaxDto) {
    return this.taxService.update(id, updateTaxDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.taxService.delete(id);

    if (deleted) {
      return {
        message: `Tax with id ${id} has been deleted.`,
        HttpCode: HttpStatus.OK,
      };
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
