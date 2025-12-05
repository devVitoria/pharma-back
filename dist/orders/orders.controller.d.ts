import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { RemoveItemsDto } from './dto/remove-items.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(dto: CreateOrderDto): Promise<"ok" | {
        quantity: number;
        id: number;
        orderId: number;
        productId: number;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        totalValue: import("@prisma/client/runtime/library").Decimal;
        accepted: boolean;
        paid: boolean;
        customerId: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        totalValue: import("@prisma/client/runtime/library").Decimal;
        accepted: boolean;
        paid: boolean;
        customerId: number;
    } | null>;
    findItemsByOrder(id: number): Promise<{
        quantity: number;
        id: number;
        orderId: number;
        productId: number;
    }[]>;
    findAllOrdersByUser(id: number): Promise<{
        id: number;
        createdAt: Date;
        totalValue: import("@prisma/client/runtime/library").Decimal;
        accepted: boolean;
        paid: boolean;
        customerId: number;
    }[]>;
    updateItems(id: number, dto: RemoveItemsDto): Promise<string>;
    deleteOrder(id: number, dto: Partial<RemoveItemsDto>): Promise<string>;
}
