import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { CreateTaxDto } from './create-tax.dto';
import { IsNotEmpty, IsString, IsUppercase, IsNumber, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaxDto extends PartialType(CreateTaxDto) {
  @IsNotEmpty()
  @IsString()
  @IsUppercase()
  @ApiProperty({
    description: 'Name of addressee',
    example: 'Luiz Fernando',
    required: true,
  })
  addressee: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Shipping destination',
    example: 'Street Augusta, 3000',
    required: true,
  })
  location: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Distance from origin to destination in kilometers',
    example: 150,
    required: true,
  })
  kilometers: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Load weight',
    required: true,
    example: 112,
  })
  loadWeigth: number;

  @IsNotEmpty()
  @IsIn([0, 1, 2, 3], {
    message:
      'Shipping status, 0 for pending, 1 for delivery, 2 for dispatch and 3 for canceled',
  })
  @ApiProperty({
    description: 'Shipping status',
    example: 0,
    required: true,
  })
  shippingStatus?: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Shipping amount',
    required: true,
    example: 115,
  })
  shippingAmount: number;
  
  @ApiHideProperty()
  createdAt: Date;

  @ApiHideProperty()
  updatedAt?: Date;
}
