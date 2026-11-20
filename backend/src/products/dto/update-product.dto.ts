import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto.js';

// Para EDITAR: las mismas reglas que al crear, pero todos los campos son opcionales
// (se puede cambiar solo el precio, solo el stock…).
export class UpdateProductDto extends PartialType(CreateProductDto) {}
