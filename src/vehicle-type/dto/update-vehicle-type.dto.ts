import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { CreateVehicleTypeDto } from './create-vehicle-type.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVehicleTypeDto extends PartialType(CreateVehicleTypeDto) {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Vehicle total capacity',
    example: '3880',
    required: true,
  })
  totalCapacity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Vehicle trunk height',
    example: '182',
    required: true,
  })
  trunkHeigth: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Vehicle trunk width',
    example: '130',
    required: true,
  })
  trunkWidth: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Vehicle trunk length',
    example: '210',
    required: true,
  })
  trunkLength: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Total weight of the vehicle',
    example: '3500',
    required: true,
  })
  totalVehicleWeight: number;
  
  @ApiHideProperty()
  createdAt: Date;

  @ApiHideProperty()
  updatedAt?: Date;
}
