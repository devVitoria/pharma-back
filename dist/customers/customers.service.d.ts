import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UserDto } from './dto/user.dto';
import { PublisherService } from 'src/messaging/publisher/publisher.service';
import { UpdateCustomerV2Dto } from './dto/update-customer-v2.dto';
export declare class CustomersService {
    private prisma;
    private publisher;
    constructor(prisma: PrismaService, publisher: PublisherService);
    create(data: CreateCustomerDto): Promise<{
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
    findOne(data: UserDto): Promise<{
        name: string;
        cpf: string;
        password: string;
        adm: boolean;
        id: number;
        deleted: boolean;
        createdAt: Date;
    }>;
    update(id: number, data: UpdateCustomerV2Dto): Promise<{
        name: string;
        cpf: string;
        password: string;
        adm: boolean;
        id: number;
        deleted: boolean;
        createdAt: Date;
    }>;
    delete(id: number): Promise<{
        name: string;
        cpf: string;
        password: string;
        adm: boolean;
        id: number;
        deleted: boolean;
        createdAt: Date;
    }>;
}
