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
exports.UpdateProductV2Dto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateProductV2Dto {
    name;
    description;
    price;
}
exports.UpdateProductV2Dto = UpdateProductV2Dto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome do produto', example: 'Camomila Intar' }),
    __metadata("design:type", String)
], UpdateProductV2Dto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descrição do produto', example: 'Efeito calmante' }),
    __metadata("design:type", String)
], UpdateProductV2Dto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'valor do produto', example: 12 }),
    __metadata("design:type", Number)
], UpdateProductV2Dto.prototype, "price", void 0);
//# sourceMappingURL=update-product-v2.dto.js.map