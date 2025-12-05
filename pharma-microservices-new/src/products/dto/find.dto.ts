import { ApiProperty } from '@nestjs/swagger';

export class FindDto {
  @ApiProperty({ description: 'id do  produto', example: 1 })
  productId: number;

  @ApiProperty({ description: 'id do usuário que está criando o produto', example: 1 })
  userId: number;
}
