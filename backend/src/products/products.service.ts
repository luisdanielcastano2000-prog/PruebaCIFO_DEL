import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Product, ProductDocument } from './schemas/product.schema.js';

// El SERVICE es el almacén: guarda los productos y hace el trabajo (crear, buscar, editar, borrar).
// Fase 3: los datos ya no viven en un array, sino en MongoDB (en disco): sobreviven a los reinicios.
// Los métodos son "async" porque hablar con la base de datos tarda un poco y hay que esperar la respuesta.
@Injectable()
export class ProductsService {
  // productModel es la puerta a la colección "products" de MongoDB (la inyecta NestJS)
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    return this.productModel.create(createProductDto);
  }

  // Más recientes primero (-1 = orden descendente)
  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<ProductDocument> {
    const product = isValidObjectId(id)
      ? await this.productModel.findById(id).exec()
      : null;
    return this.orNotFound(product, id);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDocument> {
    const product = isValidObjectId(id)
      ? await this.productModel
          .findByIdAndUpdate(id, updateProductDto, {
            returnDocument: 'after', // devuelve el producto ya modificado
            runValidators: true, // aplica también las reglas del schema al editar
          })
          .exec()
      : null;
    return this.orNotFound(product, id);
  }

  async remove(id: string): Promise<ProductDocument> {
    const product = isValidObjectId(id)
      ? await this.productModel.findByIdAndDelete(id).exec()
      : null;
    return this.orNotFound(product, id);
  }

  // Si no se encontró el producto (o el id no tiene formato de MongoDB), responde 404 como en la fase 2
  private orNotFound(
    product: ProductDocument | null,
    id: string,
  ): ProductDocument {
    if (!product) {
      throw new NotFoundException(`No existe ningún producto con id ${id}`);
    }
    return product;
  }
}
