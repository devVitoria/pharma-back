"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const microservice = app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [
                'amqps://ttjhwdmr:spY9CV13y-42P7kpvCBw-IsydpdQrIoY@kebnekaise.lmq.cloudamqp.com/ttjhwdmr',
            ],
            queue: 'main_queue',
            queueOptions: { durable: true },
        },
    });
    await app.startAllMicroservices();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Pharma Manipulados')
        .setDescription('API para gestão de pedidos de produtos manipulados em farmácia com NestJS e Prisma')
        .setVersion('2.0')
        .addTag('customer, order, product')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    await app.listen(3001);
    console.log('Rodando a aplicação em http://localhost:3001');
    console.log('Confira a documentação -> http://localhost:3001/swagger');
}
bootstrap();
//# sourceMappingURL=main.js.map