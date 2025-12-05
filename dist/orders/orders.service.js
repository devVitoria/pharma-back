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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const publisher_service_1 = require("../messaging/publisher/publisher.service");
let OrdersService = class OrdersService {
    prisma;
    publisher;
    constructor(prisma, publisher) {
        this.prisma = prisma;
        this.publisher = publisher;
    }
    async create(data) {
        const user = await this.prisma.customer.findFirst({ where: { id: data.userId } });
        if (user?.deleted)
            throw new common_1.BadRequestException('Conta deletada! Crie uma nova conta.');
        const existingOrder = await this.findOrderByUser(data.userId);
        const customProduct = await this.prisma.customProduct.findUnique({ where: { id: data.productId } });
        const product = await this.prisma.product.findUnique({ where: { id: data.productId } });
        if (!product && !customProduct)
            throw new common_1.BadRequestException('Produto não encontrado!');
        if (existingOrder) {
            await this.insertItemToOrder(existingOrder.id, data.productId, data.quantity);
            const price = data.custom ? 0 : Number(product?.price ?? 0);
            await this.prisma.order.update({
                where: { id: existingOrder.id },
                data: { totalValue: Number(existingOrder.totalValue) + price * data.quantity },
            });
            return 'ok';
        }
        const newOrder = await this.prisma.order.create({
            data: {
                customerId: data.userId,
                paid: false,
                accepted: false,
                totalValue: data.custom ? 0 : Number(product?.price ?? 0) * data.quantity,
            },
        });
        await this.publisher.publish('order.created', {
            orderId: newOrder.id,
            productId: data.productId,
            quantity: data.quantity,
            userId: data.userId,
        });
        return this.prisma.orderItem.create({
            data: { orderId: newOrder.id, productId: data.productId, quantity: data.quantity },
        });
    }
    async findAll() {
        return this.prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async findOne(data) {
        const user = await this.prisma.customer.findFirst({ where: { id: data.userId } });
        if (user?.deleted && !user?.adm)
            throw new common_1.BadRequestException('Conta deletada! Crie uma nova conta.');
        return this.prisma.order.findUnique({ where: { id: data.orderId } });
    }
    async findItemsByOrder(data) {
        const user = await this.prisma.customer.findFirst({ where: { id: data.userId } });
        if (user?.deleted)
            throw new common_1.BadRequestException('Conta deletada! Crie uma nova conta.');
        return this.prisma.orderItem.findMany({ where: { orderId: data.orderId } });
    }
    async findAllOrdersByUser(data) {
        const user = await this.prisma.customer.findFirst({ where: { id: data.userId } });
        if (user?.deleted && !user?.adm)
            throw new common_1.BadRequestException('Conta deletada! Crie uma nova conta.');
        return this.prisma.order.findMany({ where: { customerId: data.userId } });
    }
    async updateItems(data) {
        const user = await this.prisma.customer.findFirst({ where: { id: data.userId } });
        if (user?.deleted)
            throw new common_1.BadRequestException('Conta deletada! Crie uma nova conta.');
        const order = await this.prisma.order.findFirst({ where: { id: data.orderId } });
        if (!order)
            throw new common_1.BadRequestException('Pedido não encontrado');
        if (order.paid)
            throw new common_1.BadRequestException('Pedido pago não pode ser alterado');
        const item = await this.prisma.orderItem.findFirst({
            where: { productId: data.productId, orderId: data.orderId },
        });
        if (!item)
            throw new common_1.BadRequestException('Este item não pertence ao pedido');
        return this.prisma.orderItem.update({
            where: { id: item.id },
            data: { quantity: data.newQuantity },
        });
    }
    async removeItems(data) {
        const user = await this.prisma.customer.findFirst({ where: { id: data.userId } });
        if (user?.deleted)
            throw new common_1.BadRequestException('Conta deletada! Crie uma nova conta.');
        const order = await this.prisma.order.findFirst({ where: { id: data.orderId } });
        if (!order)
            throw new common_1.BadRequestException('Pedido não encontrado');
        if (order.paid)
            throw new common_1.BadRequestException('Pedido pago não pode ser alterado');
        const item = await this.prisma.orderItem.findFirst({
            where: { orderId: data.orderId, productId: data.productId },
        });
        if (!item)
            throw new common_1.BadRequestException('Este item não pertence ao pedido');
        await this.prisma.orderItem.delete({ where: { id: item.id } });
        const itensRestantes = await this.prisma.orderItem.findMany({
            where: { orderId: data.orderId },
            include: { product: true },
        });
        const total = itensRestantes.reduce((acc, item) => {
            const price = Number(item.product?.price ?? 0);
            return acc + price * item.quantity;
        }, 0);
        await this.prisma.order.update({
            where: { id: order.id },
            data: { totalValue: total, accepted: false },
        });
        await this.publisher.publish('order.recalc', { orderId: order.id });
        return 'Item removido e pedido recalculado';
    }
    async deleteOrder(data) {
        const user = await this.prisma.customer.findFirst({ where: { id: data.userId } });
        if (user?.deleted)
            throw new common_1.BadRequestException('Conta deletada! Crie uma nova conta.');
        const order = await this.prisma.order.findFirst({ where: { id: data.orderId } });
        if (!order)
            throw new common_1.BadRequestException('Pedido não encontrado');
        if (order.paid)
            throw new common_1.BadRequestException('Pedido pago não pode ser deletado');
        await this.prisma.orderItem.deleteMany({ where: { orderId: data.orderId } });
        await this.prisma.order.delete({ where: { id: data.orderId } });
        return 'ok';
    }
    async updateOrderFlags(orderId, userId, paid, accepted) {
        const user = await this.prisma.customer.findFirst({ where: { id: userId } });
        if (!user)
            throw new common_1.BadRequestException('Usuário não encontrado');
        const order = await this.prisma.order.findFirst({ where: { id: orderId } });
        if (!order)
            throw new common_1.BadRequestException('Pedido não encontrado');
        if (paid !== undefined && user.adm) {
            throw new common_1.BadRequestException('Apenas o usuário pode marcar o pedido como pago');
        }
        if (accepted !== undefined && !user.adm) {
            throw new common_1.BadRequestException('Apenas administradores podem aceitar pedidos');
        }
        return this.prisma.order.update({
            where: { id: orderId },
            data: { paid: paid ?? order.paid, accepted: accepted ?? order.accepted },
        });
    }
    findOrderByUser(userId) {
        return this.prisma.order.findFirst({
            where: { customerId: userId, paid: false, accepted: false },
            orderBy: { createdAt: 'desc' },
        });
    }
    async insertItemToOrder(orderId, productId, quantity) {
        const existing = await this.prisma.orderItem.findFirst({ where: { orderId, productId } });
        if (existing) {
            return this.prisma.orderItem.update({
                where: { id: existing.id },
                data: { quantity: existing.quantity + quantity },
            });
        }
        return this.prisma.orderItem.create({ data: { orderId, productId, quantity } });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        publisher_service_1.PublisherService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map