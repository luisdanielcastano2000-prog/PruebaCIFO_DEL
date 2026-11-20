import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { Product, ProductSchema } from './schemas/product.schema.js';

@Module({
  // Registra el modelo "Product": Mongoose lo guardará en la colección "products" de catalogo_tech
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
