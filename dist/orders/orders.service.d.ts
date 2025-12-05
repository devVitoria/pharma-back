import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-items.fto';
import { RemoveItemsDto } from './dto/remove-items.dto';
import { FindOrderDto } from './dto/find-order';
import { PublisherService } from 'src/messaging/publisher/publisher.service';
export declare class OrdersService {
    private prisma;
    private publisher;
    constructor(prisma: PrismaService, publisher: PublisherService);
    create(data: CreateOrderDto): Promise<"ok" | {
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
    findOne(data: Partial<FindOrderDto>): Promise<{
        id: number;
        createdAt: Date;
        totalValue: import("@prisma/client/runtime/library").Decimal;
        accepted: boolean;
        paid: boolean;
        customerId: number;
    } | null>;
    findItemsByOrder(data: Partial<FindOrderDto>): Promise<{
        quantity: number;
        id: number;
        orderId: number;
        productId: number;
    }[]>;
    findAllOrdersByUser(data: Partial<FindOrderDto>): Promise<{
        id: number;
        createdAt: Date;
        totalValue: import("@prisma/client/runtime/library").Decimal;
        accepted: boolean;
        paid: boolean;
        customerId: number;
    }[]>;
    updateItems(data: UpdateOrderDto): Promise<{
        quantity: number;
        id: number;
        orderId: number;
        productId: number;
    }>;
    removeItems(data: RemoveItemsDto): Promise<string>;
    deleteOrder(data: Partial<UpdateOrderDto>): Promise<string>;
    updateOrderFlags(orderId: number, userId: number, paid?: boolean, accepted?: boolean): Promise<{
        id: number;
        createdAt: Date;
        totalValue: import("@prisma/client/runtime/library").Decimal;
        accepted: boolean;
        paid: boolean;
        customerId: number;
    }>;
    findOrderByUser(userId: number): import("@prisma/client").Prisma.Prisma__OrderClient<{
        id: number;
        createdAt: Date;
        totalValue: import("@prisma/client/runtime/library").Decimal;
        accepted: boolean;
        paid: boolean;
        customerId: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    insertItemToOrder(orderId: number, productId: number, quantity: number): Promise<{
        quantity: number;
        id: number;
        orderId: number;
        productId: number;
    }>;
}
