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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const publisher_service_1 = require("../messaging/publisher/publisher.service");
let ProductsService = class ProductsService {
    prisma;
    publisher;
    constructor(prisma, publisher) {
        this.prisma = prisma;
        this.publisher = publisher;
    }
    async create(data) {
        const user = await this.prisma.customer.findFirst({
            where: {
                id: data.userId,
            },
        });
        if (user?.deleted) {
            throw new common_1.BadRequestException('Conta deletada! Crie uma nova conta.');
        }
        if (!user?.adm) {
            throw new common_1.BadRequestException('Apenas um administrador pode criar um produto');
        }
        return this.prisma.product.create({ data });
    }
    async createCustom(data) {
        const user = await this.prisma.customer.findFirst({
            where: {
                id: data.userId,
            },
        });
        if (user?.deleted) {
            throw new common_1.BadRequestException('Conta deletada! Crie uma nova conta.');
        }
        if (user?.adm) {
            throw new common_1.BadRequestException('Apenas usuário podem encomendar um item');
        }
        const dataPublisher = {
            ...user,
            ...data,
        };
        await this.publisher.publish('product_custom.created', {
            dataPublisher,
        });
        return this.prisma.customProduct.create({ data });
    }
    async findAll(data) {
        const user = await this.prisma.customer.findFirst({
            where: {
                id: data.userId,
            },
        });
        if (user?.deleted) {
            throw new common_1.BadRequestException('Conta deletada! Crie uma nova conta.');
        }
        const products = await this.prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
        });
        const customProducts = await this.prisma.customProduct.findMany({
            where: { userId: data.userId ?? 0 },
            orderBy: { createdAt: 'desc' },
        });
        return { products, customProducts };
    }
    async findAllProducts() {
        const products = await this.prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
        });
        const customProducts = await this.prisma.customProduct.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return { products, customProducts };
    }
    async findOne(data) {
        const user = await this.prisma.customer.findFirst({
            where: {
                id: data.userId,
            },
        });
        if (user?.deleted) {
            throw new common_1.BadRequestException('Conta deletada! Crie uma nova conta.');
        }
        return this.prisma.product.findUnique({ where: { id: data.productId } });
    }
    async update(userID, productId, data) {
        await this.productvalidation(productId, 'atualizar', userID, false);
        const exists = await this.prisma.product.findFirst({
            where: { id: productId },
        });
        if (!exists) {
            throw new common_1.BadRequestException(`Esse produto não existe, verifique se ele realmente  'não é' um item customizável`);
        }
        return this.prisma.product.update({ where: { id: productId }, data: data });
    }
    async updateCustom(userID, productId, data) {
        await this.productvalidation(productId, 'atualizar', userID, true);
        const exists = await this.prisma.customProduct.findFirst({
            where: { id: productId },
        });
        console.log('Exists', exists);
        if (!exists) {
            console.log('ENtrou no if');
            throw new common_1.BadRequestException(`Esse produto não existe, verifique se ele realmente é um item customizável`);
        }
        return this.prisma.customProduct.update({
            where: { id: productId },
            data: data,
        });
    }
    async remove(productId, userID) {
        await this.productvalidation(productId, 'deletar', userID, false);
        const exists = await this.prisma.product.findFirst({
            where: { id: productId },
        });
        if (!exists) {
            throw new common_1.BadRequestException(`Esse produto não existe, verifique se ele realmente NÃO é um produto customizável.`);
        }
        return this.prisma.product.delete({ where: { id: productId } });
    }
    async removeCustom(productId, userID) {
        await this.productvalidation(productId, 'deletar', userID, true);
        const exists = await this.prisma.customProduct.findFirst({
            where: { id: productId },
        });
        if (!exists) {
            throw new common_1.BadRequestException(`Esse produto customizado não existe, verifique se o ID está correto.`);
        }
        return this.prisma.customProduct.delete({ where: { id: productId } });
    }
    async productvalidation(productId, operation, userId, custom) {
        const user = await this.prisma.customer.findFirst({
            where: {
                id: userId,
            },
        });
        if (!user?.adm && !custom) {
            throw new common_1.BadRequestException(`Não é possível ${operation} um produto não customizado com uma conta padrão.`);
        }
        const product = await this.prisma.product.findFirst({
            where: {
                id: productId,
            },
        });
        const customProduct = await this.prisma.customProduct.findFirst({
            where: {
                id: productId,
            },
        });
        if (!customProduct && !product) {
            throw new common_1.BadRequestException(`Não é possível ${operation} um produto inexistente.`);
        }
        const inUse = await this.prisma.orderItem.findMany({
            where: {
                productId: productId,
            },
            distinct: ['orderId'],
        });
        const pendingOrders = await this.prisma.order.findMany({
            where: {
                id: { in: inUse.map((u) => u.orderId) },
                paid: false,
            },
        });
        if (pendingOrders.length > 0) {
            throw new common_1.BadRequestException(`Não é possível ${operation} um produto que está em pedidos pendentes.`);
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        publisher_service_1.PublisherService])
], ProductsService);
//# sourceMappingURL=products.service.js.map