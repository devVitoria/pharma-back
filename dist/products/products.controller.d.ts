import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateCustomProductDto } from './dto/create-custom-product.dto';
import { UpdateProductV2Dto } from './dto/update-product-v2.dto';
import { CustomUpdateDto } from './dto/custom-update.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(dto: CreateProductDto): Promise<{
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        id: number;
        userId: number;
    }>;
    createCustom(dto: CreateCustomProductDto): Promise<{
        name: string;
        createdAt: Date;
        id: number;
        userId: number;
        status: import("@prisma/client").$Enums.CustomStatus;
        obs: string | null;
    }>;
    findAll(userId: number): Promise<{
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
    findOne(productId: number, userId: number): Promise<{
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        id: number;
        userId: number;
    } | null>;
    update(productId: number, userID: number, dto: UpdateProductV2Dto): Promise<{
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        id: number;
        userId: number;
    }>;
    updateCustom(productId: number, userID: number, dto: CustomUpdateDto): Promise<{
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
}
