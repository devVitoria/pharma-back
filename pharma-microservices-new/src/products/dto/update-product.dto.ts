import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends CreateProductDto{
  @ApiProperty({ description: 'indica se o produto é customizado', example: true })
  custom: boolean;

  @ApiProperty({ description: 'Id do produto', example: 1 })
  productId: number;


}

