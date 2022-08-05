import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUppercase, IsNumber, IsIn} from 'class-validator';

export class StatusTaxDto {
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
}