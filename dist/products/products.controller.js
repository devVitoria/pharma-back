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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const create_custom_product_dto_1 = require("./dto/create-custom-product.dto");
const update_product_v2_dto_1 = require("./dto/update-product-v2.dto");
const custom_update_dto_1 = require("./dto/custom-update.dto");
let ProductsController = class ProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    create(dto) {
        return this.productsService.create(dto);
    }
    createCustom(dto) {
        return this.productsService.createCustom(dto);
    }
    findAll(userId) {
        return this.productsService.findAll({ userId });
    }
    findAllProducts() {
        return this.productsService.findAllProducts();
    }
    findOne(productId, userId) {
        const dto = { productId, userId };
        return this.productsService.findOne(dto);
    }
    update(productId, userID, dto) {
        return this.productsService.update(userID, productId, {
            name: dto.name,
            price: dto.price,
        });
    }
    updateCustom(productId, userID, dto) {
        return this.productsService.updateCustom(userID, productId, dto);
    }
    remove(productId, userID) {
        return this.productsService.remove(productId, userID);
    }
    removeCustom(productId, userID) {
        return this.productsService.removeCustom(productId, userID);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar um produto (ADM)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Produto criado com sucesso' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/custom'),
    (0, swagger_1.ApiOperation)({ summary: 'Criar um produto customizado' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Produto customizado criado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_custom_product_dto_1.CreateCustomProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "createCustom", null);
__decorate([
    (0, common_1.Get)('/all/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar produtos e produtos custom do usuário' }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar produtos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAllProducts", null);
__decorate([
    (0, common_1.Get)('/:productId/user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar um produto pelo ID' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('/:productId/user/:userID'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar produto (ADM)' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('userID', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_product_v2_dto_1.UpdateProductV2Dto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('/custom/:productId/user/:userID'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar produto (Custom)' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('userID', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, custom_update_dto_1.CustomUpdateDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "updateCustom", null);
__decorate([
    (0, common_1.Delete)('/:productId/user/:userID'),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar produto (ADM)' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('userID', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)('/custom/:productId/user/:userID'),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar produto (Custom)' }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('userID', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "removeCustom", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map