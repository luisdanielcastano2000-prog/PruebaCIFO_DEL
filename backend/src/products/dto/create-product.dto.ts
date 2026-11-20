import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Min,
} from 'class-validator';
import { PRODUCT_CATEGORIES } from '../entities/product.entity.js';
import type { ProductCategory } from '../entities/product.entity.js';

// DTO = forma y reglas de los datos que llegan para CREAR un producto.
// Son las mismas reglas que el formulario, repetidas aquí porque el frontend se puede saltar
// (cualquiera puede enviar una petición directamente al backend, sin pasar por el formulario).
// Cada regla lleva su mensaje en español: es lo que verá el usuario si los datos no la cumplen.
export class CreateProductDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @Length(2, 80, { message: 'El nombre debe tener entre 2 y 80 caracteres' })
  name: string;

  @IsIn(PRODUCT_CATEGORIES, {
    message: `La categoría debe ser una de estas: ${PRODUCT_CATEGORIES.join(', ')}`,
  })
  category: ProductCategory;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser un número con 2 decimales como máximo' },
  )
  @Min(0, { message: 'El precio no puede ser negativo' })
  price: number;

  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock: number;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser texto' })
  @MaxLength(300, {
    message: 'La descripción no puede superar los 300 caracteres',
  })
  description?: string;
}
