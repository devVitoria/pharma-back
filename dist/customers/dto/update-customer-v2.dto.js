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
exports.UpdateCustomerV2Dto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateCustomerV2Dto {
    name;
    password;
    adm;
}
exports.UpdateCustomerV2Dto = UpdateCustomerV2Dto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome completo do usuário', example: 'Vitória Test' }),
    __metadata("design:type", String)
], UpdateCustomerV2Dto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Senha do usuário', example: 'xxx' }),
    __metadata("design:type", String)
], UpdateCustomerV2Dto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indica se o usuário é ADM', example: 'true' }),
    __metadata("design:type", Boolean)
], UpdateCustomerV2Dto.prototype, "adm", void 0);
//# sourceMappingURL=update-customer-v2.dto.js.map