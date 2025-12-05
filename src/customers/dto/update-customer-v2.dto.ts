import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerV2Dto {
  @ApiProperty({ description: 'Nome completo do usuário', example: 'Vitória Test' })
  name: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'xxx' })
  password: string;

  @ApiProperty({ description: 'Indica se o usuário é ADM', example: 'true' })
  adm: boolean;
}