import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateCustomProductDto } from './dto/create-custom-product.dto';
import { FindDto } from './dto/find.dto';
import { PublisherService } from 'src/messaging/publisher/publisher.service';
import { UpdateProductV2Dto } from './dto/update-product-v2.dto';
import { CustomUpdateDto } from './dto/custom-update.dto';
export declare class ProductsService {
    private prisma;
    private publisher;
    constructor(prisma: PrismaService, publisher: PublisherService);
    create(data: CreateProductDto): Promise<{
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        id: number;
        userId: number;
    }>;
    createCustom(data: CreateCustomProductDto): Promise<{
        name: string;
        createdAt: Date;
        id: number;
        userId: number;
        status: import("@prisma/client").$Enums.CustomStatus;
        obs: string | null;
    }>;
    findAll(data: Partial<CreateCustomProductDto>): Promise<{
        products: {
            name: string;
            description: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            id: number;
            userId: number;
        }[];
        customProducts: {
            name: string;
            createdAt: Date;
            id: number;
            userId: number;
            status: import("@prisma/client").$Enums.CustomStatus;
            obs: string | null;
        }[];
    }>;
    findAllProducts(): Promise<{
        products: {
            name: string;
            description: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            id: number;
            userId: number;
        }[];
        customProducts: {
            name: string;
            createdAt: Date;
            id: number;
            userId: number;
            status: import("@prisma/client").$Enums.CustomStatus;
            obs: string | null;
        }[];
    }>;
    findOne(data: FindDto): Promise<{
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        id: number;
        userId: number;
    } | null>;
    update(userID: number, productId: number, data: UpdateProductV2Dto): Promise<{
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        id: number;
        userId: number;
    }>;
    updateCustom(userID: number, productId: number, data: CustomUpdateDto): Promise<{
        name: string;
        createdAt: Date;
        id: number;
        userId: number;
        status: import("@prisma/client").$Enums.CustomStatus;
        obs: string | null;
    }>;
    remove(productId: number, userID: number): Promise<{
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        id: number;
        userId: number;
    }>;
    removeCustom(productId: number, userID: number): Promise<{
        name: string;
        createdAt: Date;
        id: number;
        userId: number;
        status: import("@prisma/client").$Enums.CustomStatus;
        obs: string | null;
    }>;
    productvalidation(productId: number, operation: string, userId: number, custom: boolean): Promise<void>;
}
