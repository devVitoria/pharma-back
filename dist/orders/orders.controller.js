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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const swagger_1 = require("@nestjs/swagger");
const remove_items_dto_1 = require("./dto/remove-items.dto");
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    create(dto) {
        return this.ordersService.create(dto);
    }
    findAll() {
        return this.ordersService.findAll();
    }
    findOne(id) {
        const dto = { orderId: id };
        return this.ordersService.findOne(dto);
    }
    findItemsByOrder(id) {
        const dto = { orderId: id };
        return this.ordersService.findItemsByOrder(dto);
    }
    findAllOrdersByUser(id) {
        const dto = { userId: id ?? 0 };
        return this.ordersService.findAllOrdersByUser(dto);
    }
    updateItems(id, dto) {
        return this.ordersService.removeItems({
            userId: dto.userId,
            orderId: id,
            productId: dto.productId,
        });
    }
    deleteOrder(id, dto) {
        const { userId, ...dtoWithoutUser } = dto;
        return this.ordersService.deleteOrder({ orderId: id, ...dtoWithoutUser });
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar um pedido' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Pedido criado com sucesso' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os pedidos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de usuários' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/order/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar um pedido pelo ID do pedido' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pedido encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pedido não encontrado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/all-items-order/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar todos os itens de um pedido pelo ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pedido encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pedido não encontrado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findItemsByOrder", null);
__decorate([
    (0, common_1.Get)('/all-orders-user/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar todos os pedidos pelo ID do usuário' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuário encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuário não encontrado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findAllOrdersByUser", null);
__decorate([
    (0, common_1.Put)('/remove-item-order/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover itens do pedido' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pedido atualizado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pedido não encontrado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, remove_items_dto_1.RemoveItemsDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "updateItems", null);
__decorate([
    (0, common_1.Delete)('/delete-order/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar pedido' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pedido deletado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pedido não encontrado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "deleteOrder", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map