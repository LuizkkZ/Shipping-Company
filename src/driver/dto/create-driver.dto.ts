import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUppercase, IsUUID } from 'class-validator';

export class CreateDriverDto {
  @ApiHideProperty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @IsUppercase()
  @ApiProperty({
    description: 'Driver name',
    example: 'LUIZ',
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Driver CNH',
    example: '000123456789',
    required: true,
  })
  cnh: string;

  @IsNotEmpty()
  @IsUUID('4', {
    message: 'The idShippingCompany field must be a valid v4 uuid',
  })
  @ApiProperty({
    description: 'ID Shipping Company',
    required: true,
    example: '4f069d7a-9c5c-4b1c-b9d4-f7f2f9d2f8f4',
  })
  idShippingCompany: string;

  @ApiHideProperty()
  createdAt: Date;

  @ApiHideProperty()
  updatedAt?: Date;
}