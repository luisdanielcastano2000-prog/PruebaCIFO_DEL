# Catálogo Tech — proyecto fullstack de aprendizaje

## Contexto
- Proyecto de aprendizaje. El usuario **no sabe programar**: el objetivo es que entienda **las piezas** de una aplicación fullstack y **cómo se comunican**, no la sintaxis.
- Sistema: **macOS**. Todo se ejecuta **en local**. Usamos **Git** (repositorio en la raíz del proyecto, rama `main`, autor `Luis` con el email *noreply* de GitHub, configurado solo para este proyecto). Remoto `origin` = GitHub `luisdanielcastano2000-prog/PruebaCIFO_DEL` (**público**). Acceso por HTTPS con token guardado en el llavero de macOS.
- Idioma: explicaciones y comentarios en **español**; nombres de código (variables, archivos, rutas) en **inglés**.

## Qué construimos
Una web con un **formulario** y un **listado** de productos tecnológicos. Sin autenticación.
Se construye **por capas, en 3 fases**: cada fase añade una pieza y resuelve la limitación de la anterior.

| Fase | Pieza que se añade | Dónde se guardan los datos | Limitación que queda |
|---|---|---|---|
| 1 | Frontend (HTML, CSS, JS) | En el navegador (un array en JavaScript) | Se pierden al recargar la página |
| 2 | Backend (NestJS) | En el servidor (un array en el service) | Se pierden al reiniciar el servidor |
| 3 | Base de datos (MongoDB) | En MongoDB, en disco | Ninguna: los datos persisten |

Al empezar las fases 2 y 3, demuestra primero la limitación de la fase anterior para que el usuario vea por qué hace falta la nueva pieza.

## Las tres piezas (estado final)
| Pieza | Tecnología | Dónde corre |
|---|---|---|
| Frontend | HTML + CSS + JavaScript, sin frameworks ni herramientas de build | VS Code + extensión Live Server → `http://127.0.0.1:5500` |
| Backend (API REST) | NestJS (TypeScript); Mongoose desde la fase 3 | `http://localhost:3000` |
| Base de datos | MongoDB Community 9.0 (instalado a mano en `~/mongodb`, datos en `~/mongodb-data`; sin Homebrew porque el usuario no es administrador) + MongoDB Compass (`~/Applications`) para ver los datos | `mongodb://localhost:27017`, base `catalogo_tech` |

Flujo final: formulario → `fetch` (JSON) → API NestJS → Mongoose → MongoDB, y vuelta.
CORS activado en el backend solo para el origen de Live Server (`http://127.0.0.1:5500` y `http://localhost:5500`).

## Modelo de datos: `Product`
| Campo | Tipo | Obligatorio | Reglas |
|---|---|---|---|
| `name` | texto | sí | 2–80 caracteres |
| `category` | lista cerrada | sí | `portatil`, `movil`, `tablet`, `audio`, `accesorio` |
| `price` | número | sí | ≥ 0, en euros, 2 decimales |
| `stock` | entero | sí | ≥ 0 |
| `description` | texto | no | máx. 300 caracteres |
| `_id`, `createdAt`, `updatedAt` | automáticos | — | fase 2: los genera el service; fase 3: MongoDB/Mongoose (`timestamps: true`) |

- En la fase 2 el backend imita el formato de MongoDB (`_id` como texto, `createdAt`, `updatedAt`). Así, en la fase 3 **solo cambia el backend y el frontend queda igual**: explícalo como lección (el frontend no sabe dónde se guardan los datos).
- Validación: fase 1 en el formulario (atributos HTML); fase 2 también en el backend (DTO + `ValidationPipe`). Explica por qué hacen falta ambas: el frontend se puede saltar.

## API (desde la fase 2)
| Método | Ruta | Acción |
|---|---|---|
| GET | `/products` | listar todos (más recientes primero) |
| GET | `/products/:id` | obtener uno |
| POST | `/products` | crear |
| PATCH | `/products/:id` | editar |
| DELETE | `/products/:id` | borrar |

## Estructura
```
actividad_01/                   ← raíz, con este CLAUDE.md
├── CLAUDE.md
├── index.html                  ← entrada de GitHub Pages: redirige a frontend/
├── .nojekyll                   ← pide a GitHub Pages que publique los archivos tal cual
├── .gitignore                  ← lo que Git no guarda (node_modules/, dist/, .DS_Store, *.tsbuildinfo)
├── RETOMAR.md                  ← prompt y lista para retomar tras una pausa
├── BITACORA.md                 ← registro de lo hecho y de las decisiones (se actualiza en cada paso)
├── README.md                   ← cómo arrancar el proyecto (final de la fase 3)
├── frontend/                   ← fase 1
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── backend/                    ← fase 2, generado con Nest CLI
    └── src/
        ├── main.ts             ← arranque, CORS, ValidationPipe
        ├── app.module.ts       ← conexión a MongoDB (fase 3)
        └── products/           ← generado con `nest g resource`
            ├── products.module.ts
            ├── products.controller.ts     ← recibe las peticiones HTTP
            ├── products.service.ts        ← lógica y datos (array en fase 2, MongoDB en fase 3)
            ├── entities/product.entity.ts ← forma del producto (fase 2)
            ├── schemas/product.schema.ts  ← forma del producto en MongoDB (fase 3, sustituye a entities/)
            └── dto/                       ← forma y reglas de los datos que llegan
```

## Reglas de trabajo (obligatorias)
1. **Plan antes de actuar.** Antes de cada fase o cambio, muestra: objetivo, archivos que crearás o modificarás, comandos que ejecutarás y para qué, y qué pieza tocamos. **Espera aprobación explícita.** No encadenes fases ni amplíes el alcance sin preguntar.
2. **Pregunta siempre** ante ambigüedades, alternativas razonables o decisiones que el usuario deba entender. No supongas; si asumes algo, dilo.
3. **Pasos pequeños.** Un cambio cada vez. Después de cada paso, comprueba que funciona y enseña al usuario a verificarlo él mismo (navegador, terminal o Compass).
4. **Instalaciones.** Instala solo lo que necesita la fase en curso. Antes, comprueba si ya existe, explica qué es y para qué sirve, y pide permiso. Usa versiones LTS/estables actuales. Evita instalaciones globales con npm cuando haya alternativa (`npx`).
5. **Nada destructivo sin confirmación**: borrar archivos o carpetas, reinstalar, vaciar la base de datos, etc.
6. **Git como red de seguridad.** Antes de modificar un archivo que ya funciona, di qué va a cambiar. Al cerrar cada fase, propón un commit con el título de la fase (p. ej., `Fase 2`); si conviene guardar un punto intermedio, propónlo también. **Nunca hagas commit ni push sin aprobación del usuario**; el repositorio es público: no subir datos personales, contraseñas ni tokens. Nada de comandos que reescriban o borren historial (`reset --hard`, `push --force`…) sin confirmación.
7. **Errores.** Explica en lenguaje sencillo qué ha pasado, la causa probable y la solución propuesta; espera aprobación antes de aplicarla. No pruebes soluciones a ciegas en bucle.
8. **Terminal.** Indica siempre en qué carpeta se ejecuta cada comando y si deja un proceso corriendo (p. ej., el servidor). Si hacen falta varias pestañas de terminal, dilo.
9. **Generadores primero.** Usa el Nest CLI en lugar de escribir a mano el código repetitivo:
   - `npx @nestjs/cli new backend --skip-git --package-manager npm` (`--skip-git` porque el repositorio Git ya está en la raíz del proyecto: no queremos otro dentro de `backend/`).
   - Dentro de `backend/`: `npx nest g resource products --no-spec`.
   Explica solo los archivos que importan.
10. **Cierre de fase.** Resumen de lo aprendido (3–5 líneas), marcar los pasos completados en *Fases*, actualizar *Cómo arrancar* y *Glosario*, y proponer el commit de cierre de fase.
11. **Bitácora (`BITACORA.md`).** Al **empezar cada sesión**, lee `BITACORA.md` antes que nada para saber dónde nos quedamos. Durante la sesión, actualízala **después de cada paso o decisión** (no al final): qué se hizo, qué se verificó, decisiones con su motivo, errores y cómo se resolvieron, y el bloque *Estado actual* (fase, siguiente paso, pendientes). Fechas absolutas (AAAA-MM-DD). Registra solo hechos: lo no verificado se marca como tal.

## Cómo explicar
- Conceptos antes que sintaxis. No expliques el código línea a línea salvo que te lo pidan.
- Cada pieza o concepto nuevo: **qué es, para qué sirve y con quién se comunica**. Una analogía breve si ayuda (1–2 frases), **siempre con el mundo de una tienda de tecnología / el propio catálogo** (cliente, dependiente, almacén, mostrador…). Nada de analogías de otros ámbitos (restaurantes, etc.): confunden al usuario.
- Define cada término técnico la primera vez que aparezca (DOM, evento, endpoint, petición HTTP, JSON, puerto, CORS, DTO, schema…).
- Comentarios en el código: breves, en español, explicando el *para qué*, solo en los archivos clave.
- Respuestas concisas y estructuradas, sin relleno.
- Cuando ayude, muestra el recorrido de un dato con un esquema de texto.

## Fuera de alcance (salvo que el usuario lo pida)
Autenticación en la app, Docker, frameworks de frontend (React, Vue…), librerías CSS, TypeScript en el frontend, `localStorage` (rompería la lección de la fase 1), tests automáticos, variables de entorno con `@nestjs/config` (la URI de MongoDB va en `app.module.ts`, con un comentario que lo explique).

## Fases
### Fase 1 · Frontend simple
Comprobar: VS Code + extensión Live Server.
- [x] 1.1 Estructura HTML: formulario + listado con 2–3 productos de ejemplo.
- [x] 1.2 Estilos CSS básicos.
- [x] 1.3 JavaScript: al enviar el formulario, añadir el producto al listado (array en memoria).
- [x] 1.4 Demostrar la limitación: al recargar la página, los productos añadidos desaparecen.

### Fase 2 · Backend (NestJS, datos en memoria)
Comprobar: Node.js LTS.
- [x] 2.1 Proyecto NestJS mínimo que responde en `localhost:3000`.
- [x] 2.2 API de productos (CRUD) con los datos en un array del service; DTOs y validación. Probar sin frontend (navegador para GET, `curl` para el resto).
- [x] 2.3 Conectar frontend y backend: `fetch` y CORS; crear y listar desde la web.
- [x] 2.4 Editar y borrar desde la web.
- [x] 2.5 Demostrar la limitación: al reiniciar el servidor, los datos desaparecen.

### Fase 3 · Base de datos (MongoDB)
Comprobar: MongoDB Community y MongoDB Compass (sin Homebrew: el usuario del Mac no es administrador; instalación manual en la carpeta del usuario).
- [x] 3.1 Arrancar MongoDB y conectarse con Compass.
- [x] 3.2 Conectar NestJS con Mongoose; comprobar en el log que conecta. (La base no aparece en Compass hasta guardar el primer dato: explicar por qué.)
- [x] 3.3 Sustituir el array del service por el schema de MongoDB. Comprobar que el frontend funciona sin cambios.
- [x] 3.4 Comprobar que los datos siguen ahí tras reiniciar el servidor y verlos en Compass.
- [x] 3.5 Repaso: esquema del recorrido completo de un dato + README con los pasos para arrancar el proyecto.

### Fase 4 · Revisión y deploy
Servicios: MongoDB Atlas (M0), Render (backend), GitHub Pages (frontend). Las cuentas las crea el usuario; Claude guía. Secretos (contraseña de Atlas) nunca en el chat ni en el repo.
- [x] 4.1 Revisión completa (código + documentación) y correcciones.
- [x] 4.2 Preparar para producción: variables de entorno en el backend (`MONGODB_URI`, `PORT`, `CORS_ORIGINS`) y URL de la API según dónde se abra el frontend.
- [x] 4.3 Base de datos en MongoDB Atlas.
- [ ] 4.4 Backend en Render.
- [ ] 4.5 Frontend en GitHub Pages.
- [ ] 4.6 Comprobación final + README con las direcciones públicas.

## Cómo arrancar el proyecto
_(Versión completa y explicada en `README.md`.)_

**Orden:** primero MongoDB (desde la fase 3), luego el backend y después el frontend (la web pide los productos al backend; si está apagado, muestra "No se puede conectar con el servidor").

**Base de datos (fase 3)** — se arranca la primera
1. En una terminal (en cualquier carpeta): `~/mongodb/bin/mongod --dbpath ~/mongodb-data --bind_ip localhost --ipv6`
2. Está listo cuando el log dice `Waiting for connections` (puerto 27017). Se queda corriendo en esa pestaña.
3. Para apagarlo: `Ctrl + C` en esa terminal. Los datos quedan guardados en `~/mongodb-data`.
4. Para ver los datos: abrir **MongoDB Compass** (en `~/Applications`) → conectar a `mongodb://localhost:27017` → base `catalogo_tech` → colección `products`.

**Frontend (fase 1)**
1. Abrir la carpeta del proyecto en VS Code.
2. Abrir `frontend/index.html` → clic derecho → **Open with Live Server** (o botón **Go Live** abajo a la derecha).
3. Se abre `http://127.0.0.1:5500/frontend/index.html`. Para apagar el servidor: clic en **Port : 5500** en la barra de estado.

**Backend (fase 2)**
1. Abrir una terminal en la carpeta `backend/` (en VS Code: *Terminal → New Terminal* y escribir `cd backend`).
2. Ejecutar `npm run start:dev`. El servidor queda corriendo en esa pestaña y se reinicia solo al guardar cambios.
3. Está listo cuando aparece "Nest application successfully started". Comprobar en `http://localhost:3000`.
4. Para apagarlo: `Ctrl + C` en esa terminal.
5. Solo la primera vez en otro ordenador (o si falta `node_modules/`): `npm install` dentro de `backend/`.

## Glosario
_(Se va completando: término — definición en una línea.)_

- **HTML** — define la estructura y el contenido de la página (el esqueleto).
- **CSS** — define cómo se ve la página: colores, tamaños, disposición (la ropa).
- **JavaScript** — da comportamiento a la página: reacciona a lo que hace el usuario (los músculos).
- **Clase (`class`)** — etiqueta que se pone a un elemento HTML para que CSS o JavaScript lo reconozcan.
- **Selector** — parte del CSS que indica a qué elementos se aplica un estilo (p. ej., `.product-card`).
- **DOM** — versión "viva" del HTML que el navegador tiene en memoria y que JavaScript puede modificar.
- **Evento** — algo que ocurre en la página (clic, envío de formulario) y a lo que JavaScript puede reaccionar.
- **Array** — lista de datos en memoria; en la fase 1 guarda los productos.
- **Live Server** — extensión de VS Code que sirve la página en `http://127.0.0.1:5500` y la recarga al guardar.
- **Git** — programa que guarda "fotos" del proyecto para ver qué cambió y poder volver atrás.
- **Repositorio** — carpeta vigilada por Git; su historial vive en la carpeta oculta `.git/`.
- **Commit** — una foto del proyecto en un momento, con un título que explica qué se hizo.
- **`.gitignore`** — lista de archivos y carpetas que Git no debe guardar.
- **GitHub** — web que guarda una copia del repositorio en internet (el almacén central en la nube).
- **Remoto (`origin`)** — la dirección del repositorio en GitHub con la que está conectado el local.
- **Push** — enviar los commits del Mac a GitHub.
- **Token** — llave de acceso que sustituye a la contraseña de GitHub en la terminal; es secreta como una contraseña.
- **Backend / servidor** — programa que se queda encendido esperando peticiones y las responde (el dependiente y el almacén de la tienda).
- **Node.js** — permite ejecutar JavaScript fuera del navegador; con él corre el backend.
- **npm / npx** — npm descarga las librerías de un proyecto; npx ejecuta una herramienta sin instalarla de forma permanente.
- **NestJS** — framework (estructura ya montada) para construir backends con TypeScript.
- **TypeScript** — JavaScript con tipos: se declara la forma de los datos y avisa de errores antes de ejecutar.
- **Puerto** — número de "puerta" por la que escucha un programa (Live Server: 5500; backend: 3000).
- **Petición HTTP** — mensaje que el navegador envía al servidor (p. ej., `GET /` = "dame lo que hay en `/`").
- **Respuesta / código de estado** — lo que devuelve el servidor, con un número: `200` = bien, `404` = no existe.
- **Controller** — parte del backend que recibe las peticiones y decide qué hacer según la ruta (el dependiente).
- **Service** — parte del backend que hace el trabajo y guarda/gestiona los datos (el almacén).
- **API REST** — conjunto de direcciones (rutas) del backend a las que el frontend hace peticiones con un método: GET leer, POST crear, PATCH editar, DELETE borrar.
- **Endpoint** — una ruta concreta de la API con su método (p. ej., `GET /products`).
- **CRUD** — las 4 operaciones básicas sobre datos: Crear, Leer (*Read*), Actualizar (*Update*), Borrar (*Delete*).
- **JSON** — formato de texto con el que frontend y backend se envían datos (`{"name":"Pixel 9","price":799}`).
- **DTO** — clase que define la forma y las reglas de los datos que llegan al backend (la hoja de pedido que el dependiente revisa).
- **ValidationPipe** — el filtro de NestJS que aplica las reglas del DTO y responde `400` con los errores si no se cumplen.
- **`curl`** — programa de terminal para enviar peticiones HTTP sin navegador.
- **`fetch`** — función de JavaScript del navegador para hacer peticiones HTTP al backend desde la página.
- **Origen** — protocolo + dirección + puerto de una página (`http://127.0.0.1:5500`); otro puerto = otro origen.
- **CORS** — permiso que da el backend para que páginas de otro origen le pidan datos; sin él, el navegador bloquea la respuesta.
- **Base de datos** — programa que guarda los datos en disco de forma ordenada para que sobrevivan a los reinicios (el almacén con estanterías fijas).
- **MongoDB** — base de datos que guarda la información como documentos parecidos a JSON. Su programa servidor se llama `mongod` y escucha en el puerto 27017.
- **Colección** — grupo de documentos del mismo tipo dentro de una base (p. ej., `products`); equivale a una estantería.
- **Documento** — un registro guardado en MongoDB (un producto); equivale a una caja en la estantería.
- **MongoDB Compass** — aplicación con ventanas para ver y editar lo que hay en MongoDB.
- **Mongoose** — librería que conecta NestJS con MongoDB y define la forma (schema) de los documentos (el encargado del almacén que sabe cómo colocar cada caja).
- **URI de conexión** — la dirección de la base de datos: `mongodb://localhost:27017/catalogo_tech`.
- **Schema** — la forma y las reglas de un documento dentro de MongoDB (qué campos tiene una caja y qué puede llevar).
- **Modelo** — lo que Mongoose crea a partir del schema para buscar, guardar, editar y borrar en una colección.
- **`async` / `await`** — forma de esperar a algo que tarda (como la respuesta de la base de datos) sin bloquear el servidor.
- **Deploy** — publicar la aplicación en servidores de internet para que se pueda usar desde cualquier sitio.
- **Producción** — la versión publicada que usa la gente (frente a "desarrollo", la del Mac).
- **Variable de entorno** — ajuste que el servidor le da al programa al arrancarlo (p. ej., `MONGODB_URI`); sirve para no escribir contraseñas en el código.
- **Filtro de excepciones** — pieza de NestJS que captura un tipo de error y decide qué respuesta enviar (aquí: errores de MongoDB → 400 en español).
- **Delegación de eventos** — un solo "escuchador" en el contenedor (`#product-list`) atiende los clics de todos los botones de las tarjetas.
