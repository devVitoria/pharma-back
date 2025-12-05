import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-items.fto';
import { RemoveItemsDto } from './dto/remove-items.dto';
import { FindOrderDto } from './dto/find-order';
import { PublisherService } from 'src/messaging/publisher/publisher.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private publisher: PublisherService,
  ) {}

  async create(data: CreateOrderDto) {
    const user = await this.prisma.customer.findFirst({ where: { id: data.userId } });
    if (user?.deleted) throw new BadRequestException('Conta deletada! Crie uma nova conta.');

    const existingOrder = await this.findOrderByUser(data.userId);
    const customProduct = await this.prisma.customProduct.findUnique({ where: { id: data.productId } });
    const product = await this.prisma.product.findUnique({ where: { id: data.productId } });

    if (!product && !customProduct) throw new BadRequestException('Produto não encontrado!');

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

  async findOne(data: Partial<FindOrderDto>) {
    const user = await this.prisma.customer.findFirst({ where: { id: data.userId } });
    if (user?.deleted && !user?.adm) throw new BadRequestException('Conta deletada! Crie uma nova conta.');
    return this.prisma.order.findUnique({ where: { id: data.orderId } });
  }

  async findItemsByOrder(data: Partial<FindOrderDto>) {
    const user = await this.prisma.customer.findFirst({ where: { id: data.userId } });
    if (user?.deleted) throw new BadRequestException('Conta deletada! Crie uma nova conta.');
    return this.prisma.orderItem.findMany({ where: { orderId: data.orderId } });
  }

  async findAllOrdersByUser(data: Partial<FindOrderDto>) {
    const user = await this.prisma.customer.findFirst({ where: { id: data.userId } });
    if (user?.deleted && !user?.adm) throw new BadRequestException('Conta deletada! Crie uma nova conta.');
    return this.prisma.order.findMany({ where: { customerId: data.userId } });
  }

  async updateItems(data: UpdateOrderDto) {
    const user = await this.prisma.customer.findFirst({ where: { id: data.userId } });
    if (user?.deleted) throw new BadRequestException('Conta deletada! Crie uma nova conta.');

    const order = await this.prisma.order.findFirst({ where: { id: data.orderId } });
    if (!order) throw new BadRequestException('Pedido não encontrado');
    if (order.paid) throw new BadRequestException('Pedido pago não pode ser alterado');

    const item = await this.prisma.orderItem.findFirst({
      where: { productId: data.productId, orderId: data.orderId },
    });
    if (!item) throw new BadRequestException('Este item não pertence ao pedido');

    return this.prisma.orderItem.update({
      where: { id: item.id },
      data: { quantity: data.newQuantity },
    });
  }

  async removeItems(data: RemoveItemsDto) {
    const user = await this.prisma.customer.findFirst({ where: { id: data.userId } });
    if (user?.deleted) throw new BadRequestException('Conta deletada! Crie uma nova conta.');

    const order = await this.prisma.order.findFirst({ where: { id: data.orderId } });
    if (!order) throw new BadRequestException('Pedido não encontrado');
    if (order.paid) throw new BadRequestException('Pedido pago não pode ser alterado');

    const item = await this.prisma.orderItem.findFirst({
      where: { orderId: data.orderId, productId: data.productId },
    });
    if (!item) throw new BadRequestException('Este item não pertence ao pedido');

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

  async deleteOrder(data: Partial<UpdateOrderDto>) {
    const user = await this.prisma.customer.findFirst({ where: { id: data.userId } });
    if (user?.deleted) throw new BadRequestException('Conta deletada! Crie uma nova conta.');

    const order = await this.prisma.order.findFirst({ where: { id: data.orderId } });
    if (!order) throw new BadRequestException('Pedido não encontrado');
    if (order.paid) throw new BadRequestException('Pedido pago não pode ser deletado');

    await this.prisma.orderItem.deleteMany({ where: { orderId: data.orderId } });
    await this.prisma.order.delete({ where: { id: data.orderId } });

    return 'ok';
  }

  async updateOrderFlags(orderId: number, userId: number, paid?: boolean, accepted?: boolean) {
    const user = await this.prisma.customer.findFirst({ where: { id: userId } });
    if (!user) throw new BadRequestException('Usuário não encontrado');

    const order = await this.prisma.order.findFirst({ where: { id: orderId } });
    if (!order) throw new BadRequestException('Pedido não encontrado');

    if (paid !== undefined && user.adm) {
      throw new BadRequestException('Apenas o usuário pode marcar o pedido como pago');
    }

    if (accepted !== undefined && !user.adm) {
      throw new BadRequestException('Apenas administradores podem aceitar pedidos');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: { paid: paid ?? order.paid, accepted: accepted ?? order.accepted },
    });
  }

  findOrderByUser(userId: number) {
    return this.prisma.order.findFirst({
      where: { customerId: userId, paid: false, accepted: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async insertItemToOrder(orderId: number, productId: number, quantity: number) {
    const existing = await this.prisma.orderItem.findFirst({ where: { orderId, productId } });

    if (existing) {
      return this.prisma.orderItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    }

    return this.prisma.orderItem.create({ data: { orderId, productId, quantity } });
  }
}
