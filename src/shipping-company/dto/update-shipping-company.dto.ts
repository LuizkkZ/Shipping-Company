import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { CreateShippingCompanyDto } from './create-shipping-company.dto';
import { IsNotEmpty, IsString, IsUppercase, IsEmail, IsUUID} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShippingCompanyDto extends PartialType(CreateShippingCompanyDto) {
  @IsNotEmpty()
  @IsString()
  @IsUppercase()
  @ApiProperty({
    description: 'The name of the shipping company',
    example: 'ACME COMPANY',
    required: true,
  })
  name: string;
  
  @IsNotEmpty()
  @IsUUID('4', {
    message: 'The idTax field must be a valid v4 uuid',
   })
  @ApiProperty({
    description: 'ID Tax',
    required: true,
    example: '4f069d7a-9c5c-4b1c-b9d4-f7f2f9d2f8f4',
  })
  idTax: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'CNPJ of the shipping company',
    example: '95.589.187/0001-17',
    required: true,
  })
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Phone number',
    example: '11 912345678',
    required: true,
  })
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email address',
    example: 'company@email.com',
    required: true,
  })
  email: string;

  @ApiHideProperty()
  createdAt: Date;

  @ApiHideProperty()
  updatedAt?: Date;
}
