import { UserDto } from './user.dto';
export declare class UpdateOrderDto extends UserDto {
    orderId: number;
    productId: number;
    newQuantity: number;
}
