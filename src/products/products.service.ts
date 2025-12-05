import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateCustomProductDto } from './dto/create-custom-product.dto';
import { FindDto } from './dto/find.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PublisherService } from 'src/messaging/publisher/publisher.service';
import { UpdateProductV2Dto } from './dto/update-product-v2.dto';
import { CustomUpdateDto } from './dto/custom-update.dto';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private publisher: PublisherService,
  ) {}

  async create(data: CreateProductDto) {
    const user = await this.prisma.customer.findFirst({
      where: {
        id: data.userId,
      },
    });

    if (user?.deleted) {
      throw new BadRequestException('Conta deletada! Crie uma nova conta.');
    }

    if (!user?.adm) {
      throw new BadRequestException(
        'Apenas um administrador pode criar um produto',
      );
    }
    return this.prisma.product.create({ data });
  }

  async createCustom(data: CreateCustomProductDto) {
    const user = await this.prisma.customer.findFirst({
      where: {
        id: data.userId,
      },
    });

    if (user?.deleted) {
      throw new BadRequestException('Conta deletada! Crie uma nova conta.');
    }
    if (user?.adm) {
      throw new BadRequestException('Apenas usuário podem encomendar um item');
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

  async findAll(data: Partial<CreateCustomProductDto>) {
    const user = await this.prisma.customer.findFirst({
      where: {
        id: data.userId,
      },
    });

    if (user?.deleted) {
      throw new BadRequestException('Conta deletada! Crie uma nova conta.');
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

  async findOne(data: FindDto) {
    const user = await this.prisma.customer.findFirst({
      where: {
        id: data.userId,
      },
    });

    if (user?.deleted) {
      throw new BadRequestException('Conta deletada! Crie uma nova conta.');
    }
    return this.prisma.product.findUnique({ where: { id: data.productId } });
  }

  async update(userID: number, productId: number, data: UpdateProductV2Dto) {
    await this.productvalidation(productId, 'atualizar', userID, false);

    const exists = await this.prisma.product.findFirst({
      where: { id: productId },
    });

    if (!exists) {
      throw new BadRequestException(
        `Esse produto não existe, verifique se ele realmente  'não é' um item customizável`,
      );
    }

    return this.prisma.product.update({ where: { id: productId }, data: data });
  }

  async updateCustom(userID: number, productId: number, data: CustomUpdateDto) {
    await this.productvalidation(productId, 'atualizar', userID, true);

    const exists = await this.prisma.customProduct.findFirst({
      where: { id: productId },
    });

    console.log('Exists', exists);

    if (!exists) {
      console.log('ENtrou no if');
      throw new BadRequestException(
        `Esse produto não existe, verifique se ele realmente é um item customizável`,
      );
    }

    return this.prisma.customProduct.update({
      where: { id: productId },
      data: data,
    });
  }

  async remove(productId: number, userID: number) {
    await this.productvalidation(productId, 'deletar', userID, false);

    const exists = await this.prisma.product.findFirst({
      where: { id: productId },
    });

    if (!exists) {
      throw new BadRequestException(
        `Esse produto não existe, verifique se ele realmente NÃO é um produto customizável.`,
      );
    }

    return this.prisma.product.delete({ where: { id: productId } });
  }

  async removeCustom(productId: number, userID: number) {
    await this.productvalidation(productId, 'deletar', userID, true);

    const exists = await this.prisma.customProduct.findFirst({
      where: { id: productId },
    });

    if (!exists) {
      throw new BadRequestException(
        `Esse produto customizado não existe, verifique se o ID está correto.`,
      );
    }

    return this.prisma.customProduct.delete({ where: { id: productId } });
  }

  async productvalidation(
    productId: number,
    operation: string,
    userId: number,
    custom: boolean,
  ) {
    const user = await this.prisma.customer.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user?.adm && !custom) {
      throw new BadRequestException(
        `Não é possível ${operation} um produto não customizado com uma conta padrão.`,
      );
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
      throw new BadRequestException(
        `Não é possível ${operation} um produto inexistente.`,
      );
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
      throw new BadRequestException(
        `Não é possível ${operation} um produto que está em pedidos pendentes.`,
      );
    }
  }
}
