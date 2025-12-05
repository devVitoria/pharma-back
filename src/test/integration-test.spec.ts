import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import request from 'supertest';
import { PrismaService } from 'src/prisma/prisma.service';

describe('Será criado um produto e o mesmo deve poder ser usado no pedido criado em sequência', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let userId: number;
  let productId: number;
  let orderId: number;
  beforeAll(async () => {
     
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = app.get(PrismaService);

    await app.init();

    await prisma.orderItem.deleteMany();

    await prisma.order.deleteMany();
    
    await prisma.product.deleteMany();
    
    await prisma.customer.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Criando o usuario para utilizar na criação do produto', async () => {
    const res = await request(app.getHttpServer())
      .post('/customers')
      .send({
        name: 'Teste integracao Vitoria',
        cpf: '00000000000',
        password: '000',
        adm: true,
      })
      .expect(201);

    userId = res.body.id;
  });

  it('Criando o produto', async () => {
    const res = await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'integracao',

        price: 20,
        description: 'Produto criado para o teste de integracao',
        userId: userId,
      })
      .expect(201);

     productId = res.body.id;
  });

  it('Criando um pedido com esse produto que foi criado acima', async () => {
    const res = await request(app.getHttpServer())
      .post('/orders')
      .send({
       userId,
        productId,
        quantity: 2,
      })
      .expect(201);

    orderId = res.body.id;
    expect(orderId).toBeDefined();
  });
});
