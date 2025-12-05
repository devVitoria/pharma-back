"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const publisher_service_1 = require("../messaging/publisher/publisher.service");
let CustomersService = class CustomersService {
    prisma;
    publisher;
    constructor(prisma, publisher) {
        this.prisma = prisma;
        this.publisher = publisher;
    }
    async create(data) {
        const user = await this.prisma.customer.findFirst({
            where: {
                cpf: data.cpf,
            },
        });
        if (user) {
            if (user.deleted) {
                return this.prisma.customer.update({
                    where: { id: user.id },
                    data: { deleted: false },
                });
            }
            throw new common_1.BadRequestException('Esta conta já existe!');
        }
        console.log('Antes de mandar pra fila');
        await this.publisher.publish('customer.created', {
            user,
        });
        return this.prisma.customer.create({ data });
    }
    findAll() {
        return this.prisma.customer.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async findOne(data) {
        const user = await this.prisma.customer.findFirst({
            where: {
                id: data.userId,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Usuário não encontrado!');
        }
        if (user?.deleted) {
            throw new common_1.BadRequestException('Conta deletada! Crie uma nova conta.');
        }
        return user;
    }
    async update(id, data) {
        const anterior = await this.prisma.customer.findUnique({
            where: { id: id },
        });
        if (!anterior) {
            throw new common_1.BadRequestException('Usuário não encontrado!');
        }
        if (anterior.deleted) {
            throw new common_1.BadRequestException('Conta deletada! Crie uma nova conta.');
        }
        if (!anterior?.adm && data.adm) {
            throw new common_1.BadRequestException('Apenas um adm pode promover uma conta padrão para administrador');
        }
        return this.prisma.customer.update({ where: { id: id }, data });
    }
    async delete(id) {
        const pendingOrders = await this.prisma.order.findFirst({
            where: {
                customerId: id,
                paid: false,
            },
        });
        if (pendingOrders) {
            throw new common_1.BadRequestException('Você tem pendências em pedidos, antes de deletar sua conta, verifique a situação dos mesmos.');
        }
        const user = await this.prisma.customer.findFirst({
            where: {
                id,
            },
        });
        await this.publisher.publish('customer.deleted', {
            user,
        });
        return this.prisma.customer.update({
            where: { id },
            data: { deleted: true },
        });
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        publisher_service_1.PublisherService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map