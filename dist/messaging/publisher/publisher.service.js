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
exports.PublisherService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let PublisherService = class PublisherService {
    client;
    constructor() {
        this.client = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [
                    'amqps://ttjhwdmr:spY9CV13y-42P7kpvCBw-IsydpdQrIoY@kebnekaise.lmq.cloudamqp.com/ttjhwdmr',
                ],
                queue: 'main_queue',
                queueOptions: { durable: true },
            },
        });
    }
    async onModuleInit() {
        await this.client.connect();
        console.log('Client connect');
    }
    publish(type, payload) {
        const event = {
            eventId: Date.now(),
            type,
            timestamp: new Date().toISOString(),
            payload,
        };
        console.log("Teste");
        return this.client.emit('customer.created', event);
    }
};
exports.PublisherService = PublisherService;
exports.PublisherService = PublisherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PublisherService);
//# sourceMappingURL=publisher.service.js.map