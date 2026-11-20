import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Forma de un producto dentro de MongoDB (fase 3). Sustituye a entities/product.entity.ts.
// Mongoose crea solo los campos automáticos: _id, createdAt y updatedAt (timestamps: true).
// Son los mismos campos que imitaba la fase 2, por eso el frontend no necesita ningún cambio.

export const PRODUCT_CATEGORIES = [
  'portatil',
  'movil',
  'tablet',
  'audio',
  'accesorio',
] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

// versionKey: false → no añade el campo interno "__v", para que las respuestas sean iguales que en la fase 2
@Schema({ timestamps: true, versionKey: false })
export class Product {
  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 80,
  })
  name: string;

  @Prop({ type: String, required: true, enum: PRODUCT_CATEGORIES })
  category: ProductCategory;

  @Prop({ type: Number, required: true, min: 0 })
  price: number;

  @Prop({ type: Number, required: true, min: 0 })
  stock: number;

  @Prop({ type: String, maxlength: 300 })
  description?: string;
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
