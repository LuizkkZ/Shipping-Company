import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { CreateVehicleDto } from './create-vehicle.dto';
import { IsNotEmpty, IsString, IsUppercase, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  @IsNotEmpty()
  @IsUUID('4', {
    message: 'The idDriver field must be a valid v4 uuid',
  })
  @ApiProperty({
    description: 'ID Driver',
    required: true,
    example: '4f069d7a-9c5c-4b1c-b9d4-f7f2f9d2f8f4',
  })
  idDriver: string;

  @IsNotEmpty()
  @IsUUID('4', {
    message: 'The idVehicleType field must be a valid v4 uuid',
  })
  @ApiProperty({
    description: 'ID Vehicle Type',
    required: true,
    example: '4f069d7a-9c5c-4b1c-b9d4-f7f2f9d2f8f4',
  })
  idVehicleType: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Vehicle license plate of the vehicle',
    example: 'KKZ-0013',
    required: true,
  })
  licensePlate: string;
 
  @ApiHideProperty()
  createdAt: Date;

  @ApiHideProperty()
  updatedAt?: Date;
}
