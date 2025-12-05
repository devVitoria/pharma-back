import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'Id do usuário dono do pedido', example: 1 })
  userId: number;

  @ApiProperty({ description: 'Id do produtoq que está sendo adicionado no pedido ', example: 1 })
  productId: number;

  @ApiProperty({ description: 'Quantidade de items do produto adicionado', example: 5 })
  quantity: number;

  @ApiProperty({ description: 'Indica se o produto adicionado é um item customizado (não existia no catalogo)', example: true })
  custom?: boolean;
}