import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { MongooseValidationFilter } from './mongoose-validation.filter.js';

// Arranque del backend: crea la aplicación y la pone a escuchar en el puerto 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS: el navegador solo deja que una página pida datos a OTRA dirección (otro puerto cuenta como otra)
  // si esa dirección lo autoriza. Aquí autorizamos únicamente a la página servida por Live Server.
  app.enableCors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
  });

  // Revisa los datos que llegan con las reglas de los DTO; si no las cumplen, responde 400 con los errores.
  // whitelist + forbidNonWhitelisted: rechaza campos que no existen en el DTO.
  // transform: convierte el JSON recibido en un objeto del DTO.
  // exceptionFactory: arma la respuesta 400 con los mensajes en español (los de las reglas están en el DTO;
  // el de "campo no permitido" lo genera la propia ValidationPipe en inglés, así que lo traducimos aquí).
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.flatMap((error) =>
          Object.entries(error.constraints ?? {}).map(([rule, text]) =>
            rule === 'whitelistValidation'
              ? `El campo "${error.property}" no está permitido`
              : text,
          ),
        );
        return new BadRequestException(messages);
      },
    }),
  );

  // Errores de validación de MongoDB → 400 en español (ver mongoose-validation.filter.ts)
  app.useGlobalFilters(
    new MongooseValidationFilter(app.get(HttpAdapterHost).httpAdapter),
  );

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
