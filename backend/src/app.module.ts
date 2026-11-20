import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from './products/products.module.js';

@Module({
  imports: [
    // Conexión con MongoDB (fase 3). La dirección (URI) tiene 3 partes:
    //   mongodb://      → el "idioma" para hablar con MongoDB
    //   localhost:27017 → dónde está: en este Mac, puerto 27017
    //   catalogo_tech   → la base de datos que usamos (MongoDB la crea sola al guardar el primer dato)
    // En un proyecto real iría en una variable de entorno (.env); aquí va escrita para verla fácilmente.
    MongooseModule.forRoot('mongodb://localhost:27017/catalogo_tech'),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
