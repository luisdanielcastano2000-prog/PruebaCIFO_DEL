// Forma de un producto tal como lo guarda y devuelve el backend (fase 2).
// Imita el formato de MongoDB (_id como texto, createdAt, updatedAt) para que en la fase 3
// solo cambie el backend y el frontend siga igual.

export const PRODUCT_CATEGORIES = [
  'portatil',
  'movil',
  'tablet',
  'audio',
  'accesorio',
] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export class Product {
  _id: string;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
