import { ApiProperty } from '@nestjs/swagger';

export class CustomUpdateDto {
    @ApiProperty({ description: 'Nome do produto', example: 'Camomila Intar' })
  name: string;

  @ApiProperty({ description: 'Descrição do produto', example: 'Efeito calmante' })
  obs?: string;

  @ApiProperty({ description: 'Status de aceite do produto', example: 'APPROVED' })
  status:  'PENDING' | 'APPROVED' | 'REJECTED';

}

