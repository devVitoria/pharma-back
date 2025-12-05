import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomProductDto {
  @ApiProperty({ description: 'Nome do produto', example: 'Camomila Intar' })
  name: string;

  @ApiProperty({ description: 'Id do usuário que está cadastrando', example: '1' })
  userId: number;
}

