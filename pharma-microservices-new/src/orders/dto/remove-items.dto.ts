import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class RemoveItemsDto extends UserDto{
  @ApiProperty({ description: 'Id do pedido', example: 1 })
  orderId: number;

@ApiProperty({ description: 'Id do produto', example: 1 })
  productId: number; 

}