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
export class CreateProductDto {
  @IsString()
  @Length(2, 80)
  name: string;

  @IsIn(PRODUCT_CATEGORIES)
  category: ProductCategory;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  description?: string;
}
