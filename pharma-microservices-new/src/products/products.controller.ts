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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateCustomProductDto } from './dto/create-custom-product.dto';
import { FindDto } from './dto/find.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductV2Dto } from './dto/update-product-v2.dto';
import { CustomUpdateDto } from './dto/custom-update.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um produto (ADM)' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Post('/custom')
  @ApiOperation({ summary: 'Criar um produto customizado' })
  @ApiResponse({ status: 201, description: 'Produto customizado criado' })
  createCustom(@Body() dto: CreateCustomProductDto) {
    return this.productsService.createCustom(dto);
  }

  @Get('/all/:userId')
  @ApiOperation({ summary: 'Listar produtos e produtos custom do usuário' })
  findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.productsService.findAll({ userId });
  }
  @Get()
  @ApiOperation({ summary: 'Listar produtos' })
  findAllProducts(){
    return this.productsService.findAllProducts();
  }

  @Get('/:productId/user/:userId')
  @ApiOperation({ summary: 'Buscar um produto pelo ID' })
  findOne(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    const dto: FindDto = { productId, userId };
    return this.productsService.findOne(dto);
  }

  @Put('/:productId/user/:userID')
  @ApiOperation({ summary: 'Atualizar produto (ADM)' })
  update(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('userID', ParseIntPipe) userID: number,

    @Body() dto: UpdateProductV2Dto,
  ) {
    return this.productsService.update(userID, productId, {
      name: dto.name,
      price: dto.price,
    });
  }

  @Put('/custom/:productId/user/:userID')
  @ApiOperation({ summary: 'Atualizar produto (Custom)' })
  updateCustom(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('userID', ParseIntPipe) userID: number,

    @Body() dto: CustomUpdateDto,
  ) {
    return this.productsService.updateCustom(userID, productId, dto);
  }

  @Delete('/:productId/user/:userID')
  @ApiOperation({ summary: 'Deletar produto (ADM)' })
  remove(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('userID', ParseIntPipe) userID: number,
  ) {
    return this.productsService.remove(productId, userID);
  }

  @Delete('/custom/:productId/user/:userID')
  @ApiOperation({ summary: 'Deletar produto (Custom)' })
  removeCustom(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('userID', ParseIntPipe) userID: number,
  ) {
    return this.productsService.removeCustom(productId, userID);
  }
}
