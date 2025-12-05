import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Nome do produto', example: 'Camomila Intar' })
  name: string;

  @ApiProperty({ description: 'Descrição do produto', example: 'Efeito calmante' })
  description?: string;

  @ApiProperty({ description: 'valor do produto', example: 12 })
  price: number;

  @ApiProperty({ description: 'id do usuário que está criando o produto', example: 1 })
  userId: number;
}
