import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVehicleTypeDto {
  @ApiHideProperty()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Vehicle total capacity',
    example: '3.880',
    required: true,
  })
  totalCapacity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Vehicle trunk height',
    example: '1.82',
    required: true,
  })
  trunkHeigth: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Vehicle trunk width',
    example: '1.30',
    required: true,
  })
  trunkWidth: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Vehicle trunk length',
    example: '2.10',
    required: true,
  })
  trunkLength: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Total weight of the vehicle',
    example: '3.500',
    required: true,
  })
  totalVehicleWeight: number;

  @ApiHideProperty()
  createdAt: Date;

  @ApiHideProperty()
  updatedAt?: Date;
}
