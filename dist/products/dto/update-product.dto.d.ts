import { CreateProductDto } from './create-product.dto';
export declare class UpdateProductDto extends CreateProductDto {
    custom: boolean;
    productId: number;
}
