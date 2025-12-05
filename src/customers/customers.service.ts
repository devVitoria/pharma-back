import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UserDto } from './dto/user.dto';
import { PublisherService } from 'src/messaging/publisher/publisher.service';
import { UpdateCustomerV2Dto } from './dto/update-customer-v2.dto';

@Injectable()
export class CustomersService {
  constructor(
    private prisma: PrismaService,
    private publisher: PublisherService,
  ) {}

  async create(data: CreateCustomerDto) {
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
      throw new BadRequestException('Esta conta já existe!');
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

  async findOne(data: UserDto) {
    const user = await this.prisma.customer.findFirst({
      where: {
        id: data.userId,
      },
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado!');
    }

    if (user?.deleted) {
      throw new BadRequestException('Conta deletada! Crie uma nova conta.');
    }

    return user;
  }

  async update(id: number, data: UpdateCustomerV2Dto) {
    const anterior = await this.prisma.customer.findUnique({
      where: { id: id },
    });

    if (!anterior) {
      throw new BadRequestException('Usuário não encontrado!');
    }

    if (anterior.deleted) {
      throw new BadRequestException('Conta deletada! Crie uma nova conta.');
    }

    if (!anterior?.adm && data.adm) {
      throw new BadRequestException(
        'Apenas um adm pode promover uma conta padrão para administrador',
      );
    }

    return this.prisma.customer.update({ where: { id: id }, data });
  }

  async delete(id: number) {
    const pendingOrders = await this.prisma.order.findFirst({
      where: {
        customerId: id,
        paid: false,
      },
    });

    if (pendingOrders) {
      throw new BadRequestException(
        'Você tem pendências em pedidos, antes de deletar sua conta, verifique a situação dos mesmos.',
      );
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
}
