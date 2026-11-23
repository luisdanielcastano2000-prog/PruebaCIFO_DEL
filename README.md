# Catálogo Tech

Web para dar de alta y gestionar productos tecnológicos: un formulario y un listado donde se puede **crear, ver, editar y borrar** productos.
Es un proyecto de aprendizaje: una aplicación *fullstack* construida en 3 fases (frontend → backend → base de datos).

## Las tres piezas

| Pieza | Tecnología | Dónde corre | En la tienda sería… |
|---|---|---|---|
| Frontend | HTML + CSS + JavaScript (`frontend/`) | Live Server → `http://127.0.0.1:5500` | El mostrador, donde el cliente ve y pide |
| Backend (API REST) | NestJS + Mongoose (`backend/`) | `http://localhost:3000` | El dependiente, que atiende los pedidos |
| Base de datos | MongoDB Community 9 | `mongodb://localhost:27017`, base `catalogo_tech` | El almacén con estanterías fijas |

## En internet (versión publicada)

**Abre la web:** https://luisdanielcastano2000-prog.github.io/PruebaCIFO_DEL/

Las mismas tres piezas, pero en servicios de internet gratuitos:

| Pieza | Servicio | Dirección |
|---|---|---|
| Frontend | GitHub Pages (publica la raíz de la rama `main`) | `https://luisdanielcastano2000-prog.github.io/PruebaCIFO_DEL/` |
| Backend | Render (servicio *Free*, Frankfurt; carpeta `backend`) | `https://pruebacifo-del.onrender.com` (lista: `/products`) |
| Base de datos | MongoDB Atlas (clúster M0 gratis) | base `catalogo_tech`, colección `products` |

```
 Navegador (cualquier sitio) ──► GitHub Pages: descarga la web (index.html, styles.css, app.js)
          │
          └── fetch ──► Render: backend NestJS ──► Mongoose ──► MongoDB Atlas
```

- **Mismo código que en el Mac.** `frontend/app.js` mira desde dónde se abre: en `127.0.0.1`/`localhost` usa `http://localhost:3000`; en cualquier otro sitio, Render.
- **Ajustes de Render** (*Environment*): `MONGODB_URI` (cadena de Atlas con la contraseña; **solo ahí**, nunca en el repositorio), `CORS_ORIGINS` = `https://luisdanielcastano2000-prog.github.io`. Build: `npm ci && npm run build` · Start: `npm run start:prod`.
- **Actualizar la versión publicada:** basta con hacer push a `main`. GitHub Pages y Render vuelven a publicar solos en 1–3 minutos.
- **Ver los datos:** Atlas → *Clusters* → *Browse Collections* → `catalogo_tech` → `products`.

**A tener en cuenta**
- Render gratis **se duerme** tras 15 minutos sin visitas: la primera carga puede tardar ~1 minuto.
- Atlas M0 **se pausa** tras 30 días sin uso: se reactiva desde la web de Atlas (*Resume*).
- La web **no tiene login**: cualquiera con el enlace puede crear, editar y borrar productos.

## Requisitos (ya instalados en este Mac)

- **VS Code** con la extensión **Live Server**.
- **Node.js** LTS (v26).
- **MongoDB Community** en `~/mongodb` (datos en `~/mongodb-data`) y **MongoDB Compass** en `~/Applications`.
  Se instalaron a mano, sin Homebrew, porque el usuario del Mac no es administrador.

## Cómo arrancar el proyecto

Hacen falta **dos pestañas de terminal** (en VS Code: *Terminal → New Terminal*; el botón **+** abre otra). Arranca las piezas **en este orden**:

**1. Base de datos** (terminal 1, en cualquier carpeta)
```
~/mongodb/bin/mongod --dbpath ~/mongodb-data --bind_ip localhost --ipv6
```
Lista cuando aparece `Waiting for connections`. Se queda corriendo: no cierres esa terminal.

**2. Backend** (terminal 2, en la carpeta del proyecto)
```
cd backend
npm install        # solo la primera vez (o si falta la carpeta node_modules)
npm run start:dev
```
Listo cuando aparece `Nest application successfully started`. Se queda corriendo.

**3. Frontend**
En VS Code, abre `frontend/index.html` → clic derecho → **Open with Live Server** (o botón **Go Live**).
Se abre `http://127.0.0.1:5500/frontend/index.html`.

**Para apagar:** `Ctrl + C` en cada terminal (primero el backend, luego MongoDB) y clic en **Port : 5500** para Live Server. Los productos quedan guardados en disco.

## Ver los datos con Compass

1. Abre **MongoDB Compass** (Finder → tu carpeta de usuario → Aplicaciones, o `Cmd + Espacio` y escribe "Compass").
2. Conecta a `mongodb://localhost:27017`.
3. Abre la base **`catalogo_tech`** → colección **`products`**. Cada producto es un *documento*.

La base `catalogo_tech` **no aparece hasta que se guarda el primer producto**: MongoDB solo la crea cuando llega el primer dato.

## Recorrido de un dato: crear un producto

```
 NAVEGADOR (frontend)                 BACKEND (NestJS, puerto 3000)                 MONGODB (puerto 27017)
 ────────────────────                 ─────────────────────────────                 ──────────────────────
 1. Rellenas el formulario y
    pulsas "Añadir producto"
    (el navegador comprueba
    required, min… )
          │
 2. app.js lee los campos y hace
    fetch POST /products
    con el producto en JSON  ───────► 3. CORS: ¿viene de Live Server? → sí
                                      4. ValidationPipe + DTO revisan las reglas
                                         (si fallan → responde 400 con los
                                          errores en español ─────► vuelve al paso 9)
                                      5. ProductsController (el dependiente)
                                         recibe el pedido y llama al service
                                      6. ProductsService (el almacén) usa el
                                         modelo de Mongoose: create()  ─────────────► 7. Guarda el documento en
                                                                                         catalogo_tech.products, en disco,
                                                                                         y le pone _id, createdAt, updatedAt
                                      8. Responde 201 con el producto  ◄─────────────
          ◄──────────────────────────    guardado (JSON)
 9. app.js vacía el formulario y
    pide la lista (GET /products) → mismo camino → MongoDB devuelve los productos
    → pinta las tarjetas
```

Editar (`PATCH`) y borrar (`DELETE`) siguen el mismo camino.

## API

| Método | Ruta | Acción | Respuestas |
|---|---|---|---|
| GET | `/products` | listar todos (más recientes primero) | 200 |
| GET | `/products/:id` | obtener uno | 200, 404 |
| POST | `/products` | crear | 201, 400 |
| PATCH | `/products/:id` | editar | 200, 400, 404 |
| DELETE | `/products/:id` | borrar | 200, 404 |

Producto: `name` (2–80 caracteres), `category` (`portatil`, `movil`, `tablet`, `audio`, `accesorio`), `price` (≥ 0, máx. 2 decimales), `stock` (entero ≥ 0), `description` (opcional, máx. 300) + automáticos `_id`, `createdAt`, `updatedAt`.

## Estructura

```
actividad_01/
├── README.md          ← este archivo
├── CLAUDE.md          ← plan del proyecto y reglas de trabajo
├── BITACORA.md        ← registro de lo hecho y de las decisiones
├── index.html         ← entrada de GitHub Pages: redirige a frontend/
├── .nojekyll          ← pide a GitHub Pages que publique los archivos tal cual
├── frontend/          ← index.html, styles.css, app.js
└── backend/
    └── src/
        ├── main.ts                 ← arranque, CORS, validación
        ├── app.module.ts           ← conexión a MongoDB
        └── products/
            ├── products.controller.ts  ← recibe las peticiones HTTP
            ├── products.service.ts     ← guarda y busca en MongoDB
            ├── schemas/product.schema.ts ← forma del producto en MongoDB
            └── dto/                    ← reglas de los datos que llegan
```

## Si algo falla

| Síntoma | Causa probable | Solución |
|---|---|---|
| La web dice "No se puede conectar con el servidor" | El backend está apagado | Arranca el backend (paso 2) |
| La web se queda en "Cargando productos…" | MongoDB está apagado: el backend espera a que vuelva | Arranca MongoDB (paso 1) |
| Al arrancar el backend: `EADDRINUSE` (puerto 3000 ocupado) | Ya hay otro backend corriendo | Ciérralo con `Ctrl + C` en su terminal |
| `mongod` se cierra nada más arrancar | Ya hay otro MongoDB corriendo, o falta la carpeta `~/mongodb-data` | Cierra el otro, o crea la carpeta con `mkdir ~/mongodb-data` |
| **Publicada:** la web tarda ~1 minuto en cargar los productos | Render estaba dormido | Esperar; las siguientes cargas son rápidas |
| **Publicada:** Render muestra `ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR` al arrancar | Atlas no deja entrar a Render | Atlas → *Network Access*: `0.0.0.0/0` en estado *Active*; luego *Manual Deploy* en Render |
| **Publicada:** Render muestra `MongoParseError: Invalid scheme` | El valor de `MONGODB_URI` está mal copiado | Debe empezar por `mongodb+srv://`, sin comillas, espacios ni `<` `>` |
| **Publicada:** "No se puede conectar con el servidor" tras mucho tiempo sin usarla | Atlas pausado (30 días sin uso) o deploy fallido en Render | Reactivar el clúster en Atlas; revisar *Logs* en Render |
