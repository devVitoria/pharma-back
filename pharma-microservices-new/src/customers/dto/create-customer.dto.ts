import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Nome completo do usuário', example: 'Vitória Test' })
  name: string;

  @ApiProperty({ description: 'Cpf do usuário', example: '05264565580', maxLength: 11 })
  cpf: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'xxx' })
  password: string;

  @ApiProperty({ description: 'Indica se o usuário é ADM', example: 'true' })
  adm: boolean;
}