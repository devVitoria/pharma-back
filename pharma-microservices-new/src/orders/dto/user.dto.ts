import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'Id do usuário dono do pedido', example: 1 })
  userId: number;

}