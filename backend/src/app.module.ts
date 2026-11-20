import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from './products/products.module.js';

@Module({
  imports: [
    // Conexión con MongoDB. La dirección (URI) tiene estas partes:
    //   mongodb://      → el "idioma" para hablar con MongoDB
    //   localhost:27017 → dónde está: en este Mac, puerto 27017
    //   catalogo_tech   → la base de datos que usamos (MongoDB la crea sola al guardar el primer dato)
    // En internet (Render) la URI llega en la variable de entorno MONGODB_URI, porque lleva la contraseña
    // de MongoDB Atlas y NUNCA debe escribirse en el código (el repositorio es público).
    // Si no existe esa variable (en el Mac), se usa el MongoDB local.
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017/catalogo_tech',
      { dbName: 'catalogo_tech' }, // la base se llama igual en local y en Atlas
    ),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
