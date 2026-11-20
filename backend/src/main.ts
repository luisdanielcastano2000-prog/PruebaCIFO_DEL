import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

// Arranque del backend: crea la aplicación y la pone a escuchar en el puerto 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Revisa los datos que llegan con las reglas de los DTO; si no las cumplen, responde 400 con los errores.
  // whitelist + forbidNonWhitelisted: rechaza campos que no existen en el DTO.
  // transform: convierte el JSON recibido en un objeto del DTO.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
