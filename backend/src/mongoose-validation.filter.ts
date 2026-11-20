import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Error as MongooseError } from 'mongoose';

// Red de seguridad: si unos datos pasan las reglas del DTO pero MongoDB (el schema) los rechaza
// (p. ej., PATCH con "name": null), respondemos 400 con un mensaje en español en vez de un error 500.
@Catch(MongooseError.ValidationError)
export class MongooseValidationFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  catch(exception: MongooseError.ValidationError, host: ArgumentsHost) {
    const messages = Object.values(exception.errors).map((error) =>
      error.kind === 'required'
        ? `El campo "${error.path}" es obligatorio`
        : `El valor del campo "${error.path}" no es válido`,
    );
    super.catch(new BadRequestException(messages), host);
  }
}
