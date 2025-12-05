import { ApiProperty } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends CreateCustomerDto {
  @ApiProperty({ description: 'Id usuário', example: 1 })
  userId: number;

}