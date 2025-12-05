import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from 'src/customers/customers.service';

describe('CustomersService', () => {
  let service: CustomersService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      customer: {
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 1, name: 'teste unit vi' }), 
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        { provide: 'PrismaService', useValue: prisma },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('deve criar um usuário e chamar prisma.customer.create com os dados corretos', async () => {
    const result = await service.create({
      name: 'teste unit vi',
      cpf: '00000000000',
      password: '000',
      adm: true
    });

    expect(prisma.customer.findFirst).toHaveBeenCalled();
    expect(prisma.customer.create).toHaveBeenCalledWith({
      data: {
        name: 'teste unit vi',
        cpf: '00000000000',
        password: '000',
        adm: true
      },
    });
    expect(result.id).toBe(1);
  });
});
