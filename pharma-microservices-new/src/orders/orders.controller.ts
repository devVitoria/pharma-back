import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { FindOrderDto } from './dto/find-order';
import { UpdateOrderDto } from './dto/update-items.fto';
import { RemoveItemsDto } from './dto/remove-items.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um pedido' })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso' })
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de usuários' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('/order/:id')
  @ApiOperation({ summary: 'Buscar um pedido pelo ID do pedido' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    const dto: Partial<FindOrderDto> = { orderId: id };
    return this.ordersService.findOne(dto);
  }

  @Get('/all-items-order/:id')
  @ApiOperation({ summary: 'Buscar todos os itens de um pedido pelo ID' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  findItemsByOrder(@Param('id', ParseIntPipe) id: number) {
    const dto: Partial<FindOrderDto> = {  orderId: id  };
    return this.ordersService.findItemsByOrder(dto);
  }

  @Get('/all-orders-user/:id')
  @ApiOperation({ summary: 'Buscar todos os pedidos pelo ID do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findAllOrdersByUser(@Param('id', ParseIntPipe) id: number) {
    const dto: Partial<FindOrderDto> = { userId: id ?? 0 };
    return this.ordersService.findAllOrdersByUser(dto);
  }

  @Put('/remove-item-order/:id')
  @ApiOperation({ summary: 'Remover itens do pedido' })
  @ApiResponse({ status: 200, description: 'Pedido atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  updateItems(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RemoveItemsDto,
  ) {
    return this.ordersService.removeItems({
      userId: dto.userId,
      orderId: id,
      productId: dto.productId,
    });
  }

  @Delete('/delete-order/:id')
  @ApiOperation({ summary: 'Deletar pedido' })
  @ApiResponse({ status: 200, description: 'Pedido deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  deleteOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<RemoveItemsDto>,
  ) {
    const { userId, ...dtoWithoutUser } = dto;

    return this.ordersService.deleteOrder({ orderId: id, ...dtoWithoutUser });
  }
}
