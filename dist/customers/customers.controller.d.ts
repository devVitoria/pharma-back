import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerV2Dto } from './dto/update-customer-v2.dto';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(dto: CreateCustomerDto): Promise<{
        name: string;
        cpf: string;
        password: string;
        adm: boolean;
        id: number;
        deleted: boolean;
        createdAt: Date;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        name: string;
        cpf: string;
        password: string;
        adm: boolean;
        id: number;
        deleted: boolean;
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        cpf: string;
        password: string;
        adm: boolean;
        id: number;
        deleted: boolean;
        createdAt: Date;
    }>;
    update(id: number, dto: UpdateCustomerV2Dto): Promise<{
        name: string;
        cpf: string;
        password: string;
        adm: boolean;
        id: number;
        deleted: boolean;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        name: string;
        cpf: string;
        password: string;
        adm: boolean;
        id: number;
        deleted: boolean;
        createdAt: Date;
    }>;
}
