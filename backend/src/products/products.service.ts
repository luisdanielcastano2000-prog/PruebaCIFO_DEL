import { Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Product } from './entities/product.entity.js';

// El SERVICE es el almacén: guarda los productos y hace el trabajo (crear, buscar, editar, borrar).
// Fase 2: los datos viven en un array, en la memoria del servidor.
// Al reiniciar el servidor, el array vuelve a su estado inicial (limitación de esta fase).
@Injectable()
export class ProductsService {
  private products: Product[] = [
    this.build(
      {
        name: 'MacBook Air 13',
        category: 'portatil',
        price: 1199,
        stock: 8,
        description: 'Portátil ligero con chip Apple M3 y 16 GB de RAM.',
      },
      1,
    ),
    this.build(
      {
        name: 'Pixel 9',
        category: 'movil',
        price: 799,
        stock: 15,
        description: 'Móvil Android con cámara de 50 MP.',
      },
      2,
    ),
    this.build(
      {
        name: 'Sony WH-1000XM5',
        category: 'audio',
        price: 349.99,
        stock: 0,
        description: 'Auriculares inalámbricos con cancelación de ruido.',
      },
      3,
    ),
  ];

  create(createProductDto: CreateProductDto): Product {
    const product = this.build(createProductDto);
    this.products.push(product);
    return product;
  }

  // Más recientes primero
  findAll(): Product[] {
    return [...this.products].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  findOne(id: string): Product {
    const product = this.products.find((p) => p._id === id);
    if (!product) {
      throw new NotFoundException(`No existe ningún producto con id ${id}`); // responde 404
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto): Product {
    const product = this.findOne(id);
    Object.assign(product, updateProductDto, { updatedAt: new Date() });
    return product;
  }

  remove(id: string): Product {
    const product = this.findOne(id);
    this.products = this.products.filter((p) => p._id !== id);
    return product;
  }

  // Crea un producto completo con los campos automáticos, imitando a MongoDB:
  // _id de 24 caracteres hexadecimales, createdAt y updatedAt.
  // minutesAgo solo se usa en los productos de ejemplo, para que salgan siempre en el mismo orden.
  private build(data: CreateProductDto, minutesAgo = 0): Product {
    const date = new Date(Date.now() - minutesAgo * 60_000);
    return {
      _id: randomBytes(12).toString('hex'),
      name: data.name,
      category: data.category,
      price: data.price,
      stock: data.stock,
      description: data.description,
      createdAt: date,
      updatedAt: date,
    };
  }
}
