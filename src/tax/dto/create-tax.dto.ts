import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUppercase,
  IsNumber,
  IsIn,
} from 'class-validator';

export class CreateTaxDto {
  @ApiHideProperty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @IsUppercase()
  @ApiProperty({
    description: 'Name of addressee',
    example: 'Luiz',
    required: true,
  })
  addressee: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Shipping destination',
    example: 'Street Augusta',
    required: true,
  })
  location: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Distance from origin to destination in kilometers',
    example: 100,
    required: true,
  })
  kilometers: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Load weight',
    required: true,
    example: 100,
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
    example: 110,
  })
  shippingAmount: number;

  @ApiHideProperty()
  createdAt: Date;

  @ApiHideProperty()
  updatedAt?: Date;
}
