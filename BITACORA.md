# Bitácora · Catálogo Tech

Registro de lo que hacemos y de las decisiones que tomamos, para no perder contexto entre sesiones.
El plan completo y las reglas de trabajo están en `CLAUDE.md`; aquí va **lo que ha pasado de verdad**.

---

## Estado actual (actualizado 2026-11-20, al irnos de fin de semana)
- **Fase:** 4 · Revisión y deploy. Hechos 4.1 (revisión), 4.2 (preparar producción) y 4.3 (Atlas). **En curso: 4.4 (backend en Render)**. Pendientes: 4.5 (GitHub Pages) y 4.6 (comprobación final).
- **Dónde nos quedamos:** Render ya compila y arranca el backend, pero no conecta con Atlas: error `ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR` = Atlas no deja entrar a Render. Falta comprobar/añadir `0.0.0.0/0` en Atlas → *Security → Network Access* (estado **Active**) y relanzar el deploy en Render (*Manual Deploy → Deploy latest commit*).
- **Para retomar el lunes:** ver `RETOMAR.md` (prompt para pegar + lista de comprobación).
- **Procesos corriendo:** ninguno cuando se cierre la sesión (MongoDB local y el backend local los arrancó Claude y se apagan con ella; los datos locales quedan en `~/mongodb-data`).
- **Pendiente de decidir:** nada.
- **Control de versiones:** Git, rama `main`, conectada con GitHub (`origin`, público). Todo subido a GitHub, incluido `RETOMAR.md` (push aprobado por el usuario).
- **Copias de seguridad:** `~/Documents/proyectos/actividad_01-fase1` (copia de carpeta del fin de la fase 1; se conserva por decisión del usuario).

---

## Decisiones tomadas
| Fecha | Decisión | Motivo |
|---|---|---|
| 2026-11-20 | El producto agotado (stock 0) se marca con la clase `out-of-stock` y se pinta en rojo. | Que se vea de un vistazo qué productos no hay. Se añadió ya en el paso 1.2 (opción elegida por el usuario) para verlo antes de tener JavaScript. |
| 2026-11-20 | Las tarjetas de ejemplo dejan de estar escritas a mano en el HTML y pasan a ser datos del array en `app.js`. | Una única fuente de verdad: lo que se ve sale siempre del array. |
| 2026-11-20 | Los productos nuevos aparecen **los primeros** del listado, en la misma cuadrícula que los de ejemplo. | El modelo de datos pide "más recientes primero". Confirmado por el usuario. |
| 2026-11-20 | Las tarjetas se construyen con `textContent` (no `innerHTML`). | Lo que escribe el usuario se muestra como texto y nunca se interpreta como HTML. |
| 2026-11-20 | Copia de seguridad de la fase 1 en `actividad_01-fase1`. | Sin Git no hay vuelta atrás; la copia permite volver al estado de la fase 1. |
| 2026-11-20 | Se crea esta bitácora (`BITACORA.md`) y `CLAUDE.md` obliga a leerla al empezar y a actualizarla en cada paso. | Pedido por el usuario: no perder contexto y tener control de todo. Nombre y ubicación (raíz del proyecto) confirmados por el usuario. Nivel de detalle aprobado. |
| 2026-11-20 | Se añade **Git** al proyecto (antes estaba fuera de alcance). Repositorio en la raíz, rama `main`. | Pedido por el usuario antes de empezar la fase 2: tener historial y poder volver atrás. |
| 2026-11-20 | Autor de los commits: `Luis` + email de su cuenta, configurado **solo para este proyecto** (`git config` local). | Elegido por el usuario. |
| 2026-11-20 | `.gitignore` con `.DS_Store`, `node_modules/` y `dist/`. | No guardar archivos del sistema ni cosas que se regeneran (pesan mucho). |
| 2026-11-20 | Al cerrar cada fase: commit con el título de la fase (sustituye a la copia de carpeta). Claude nunca hace commit sin aprobación. | `CLAUDE.md`, regla 6 actualizada. |
| 2026-11-20 | NestJS se seguirá generando con `--skip-git`. | El repositorio ya está en la raíz; no queremos otro dentro de `backend/`. |
| 2026-11-20 | La copia `actividad_01-fase1` se conserva. | Decisión del usuario. |
| 2026-11-20 | Plan del paso 2.1 aprobado. El servidor de desarrollo lo arranca **Claude en segundo plano** (opción a). | Elegido por el usuario (Claude recomendaba que lo arrancara el usuario para ver los mensajes en directo). |
| 2026-11-20 | Las analogías se harán **siempre con una tienda de tecnología / el catálogo** (cliente, dependiente, almacén…). Añadido a "Cómo explicar" en `CLAUDE.md`. | Claude usó una analogía de restaurante y confundió al usuario; el usuario eligió esta opción (a) frente a no usar analogías (b). |
| 2026-11-20 | No avanzar al paso 2.2 hasta que el usuario lo indique. | Pedido por el usuario. |
| 2026-11-20 | Se conecta el proyecto a GitHub: `origin` = `https://github.com/luisdanielcastano2000-prog/PruebaCIFO_DEL.git` (repositorio público, estaba vacío). GitHub sale de "fuera de alcance". | Pedido por el usuario. |
| 2026-11-20 | Email de los commits: el *noreply* de GitHub (`359060953+luisdanielcastano2000-prog@users.noreply.github.com`) en lugar del Gmail. Los 2 commits existentes se reescribieron con ese email (mismo contenido, nuevos identificadores). | El repositorio es público: no exponer el email personal. Opción a, elegida por el usuario. |
| 2026-11-20 | Login en GitHub con **token** (HTTPS) guardado en el llavero de macOS; el push lo ejecuta el usuario en su terminal y el token nunca se pega en el chat. | Opción a, elegida por el usuario (frente a instalar Homebrew + `gh`). |
| 2026-11-20 | El token pegado en el chat **no se revoca**. | Decisión del usuario: entorno de clase y repositorio de prueba. El token solo da acceso a `PruebaCIFO_DEL`. |
| 2026-11-20 | **Trabajo autónomo autorizado**: revisar la fase 1 y hacer la fase 2 completa mientras el usuario descansa, sin esperar aprobación en cada paso. Claude hará commits locales por paso; el **push** a GitHub se deja para cuando vuelva el usuario. Las verificaciones en el navegador quedan como lista para el usuario. | Pedido explícito del usuario ("haz todo lo necesario mientras estoy de descanso"). |
| 2026-11-20 | El service arranca con los **mismos 3 productos de ejemplo** de la fase 1 (con horas de creación escalonadas para que salgan en el mismo orden). | Que la web se vea igual al conectarla en el 2.3, y que en el 2.5 se vea la limitación igual que en el 1.4 (lo añadido desaparece, los ejemplos vuelven). |
| 2026-11-20 | El `_id` se genera con 24 caracteres hexadecimales (como un ObjectId de MongoDB); las fechas se envían en formato ISO. | Imitar el formato de MongoDB para que en la fase 3 el frontend no cambie. |
| 2026-11-20 | Validación con `class-validator` + `ValidationPipe` (`whitelist`, `forbidNonWhitelisted`, `transform`): los campos que no existen en el DTO se rechazan. | Lo marcaba `CLAUDE.md`. El `AGENTS.md` de NestJS sugiere otras librerías (Zod…), pero manda `CLAUDE.md`. Tampoco se añaden tests (fuera de alcance). |
| 2026-11-20 | CORS solo para `http://127.0.0.1:5500` y `http://localhost:5500`. | Lo marcaba `CLAUDE.md`: solo la página de Live Server puede usar la API desde el navegador. |
| 2026-11-20 | Tras crear un producto, el frontend **vuelve a pedir la lista** al backend (en vez de añadirlo a mano). | Lo que se ve es siempre lo que hay en el servidor (una única fuente de verdad). |
| 2026-11-20 | La página muestra mensajes: "Cargando…", "Todavía no hay productos", errores de validación del backend (400) y "No se puede conectar con el servidor". | Que el usuario vea qué pasa cuando el backend falla o rechaza datos (útil para aprender). |
| 2026-11-20 | `*.tsbuildinfo` añadido a `.gitignore` y quitado del repositorio. | Es un archivo temporal de compilación; se coló en el commit del 2.1. |
| 2026-11-20 | Editar reutiliza el **mismo formulario** (cambia a "Editar producto" / "Guardar cambios" + botón Cancelar; la tarjeta editada se marca en azul). Borrar pide confirmación (`confirm`). | Menos piezas nuevas que aprender; la confirmación evita borrados por error. |
| 2026-11-20 | Los mensajes de validación del backend se muestran tal cual, **en inglés** (los de `class-validator`). | Traducirlos amplía el alcance; queda como propuesta para el usuario. → **Sustituida** (ver siguiente). |
| 2026-11-20 | Mensajes de error del backend **en español**: cada regla del DTO lleva su `message`, y el de "campo no permitido" se traduce en `exceptionFactory` de la `ValidationPipe` (`main.ts`). | Pedido por el usuario. |
| 2026-11-20 | MongoDB y Compass se instalan **sin Homebrew**, a mano en la carpeta del usuario: `~/mongodb/` (programa), `~/mongodb-data/` (datos), `~/Applications/MongoDB Compass.app`. | El usuario del Mac **no es administrador** y Homebrew lo exige. Aprobado por el usuario. |
| 2026-11-20 | **Fase 3 completa en trabajo autónomo** (instalaciones incluidas), con commits locales por paso. | Pedido explícito del usuario ("instálalo todo tú y haz la fase 3 completa"). |
| 2026-11-20 | MongoDB 9.0.8 (la versión estable más reciente en la web oficial). | Regla 4 de `CLAUDE.md`: versiones estables actuales. |
| 2026-11-20 | `mongod` escucha solo en el propio Mac, en IPv4 y en IPv6 (`--bind_ip localhost --ipv6`). | En el Mac "localhost" puede ser `127.0.0.1` o `::1`; así Compass y NestJS conectan con `localhost` sin fallos. Nadie de fuera del Mac puede conectarse. |
| 2026-11-20 | `schemas/product.schema.ts` sustituye a `entities/product.entity.ts` (borrado; sigue en el historial de Git). La lista de categorías pasa al schema. | Lo marcaba `CLAUDE.md`. |
| 2026-11-20 | Schema con `timestamps: true` y `versionKey: false`; reglas también en el schema (`required`, `min`, `enum`, `maxlength`); al editar, `runValidators: true`. | Respuestas idénticas a la fase 2 (sin el campo interno `__v`) y una última red de seguridad en la propia base de datos. |
| 2026-11-20 | Un id con formato no válido para MongoDB responde **404** (no 500). | Mismo comportamiento que en la fase 2. |
| 2026-11-20 | La base empieza **vacía**: no se cargan los 3 productos de ejemplo. | Así el usuario ve la lección de la fase 3: `catalogo_tech` aparece en Compass solo al guardar el primer producto. |
| 2026-11-20 | Tras las pruebas, Claude **borró la base `catalogo_tech`** (solo contenía su producto de prueba; lo comprobó antes de borrar). | Que el usuario vea por sí mismo cómo aparece la base en Compass al guardar su primer producto. |
| 2026-11-20 | **Fase 4 (nueva): revisión completa + deploy.** Servicios: **MongoDB Atlas** (M0 gratis) para la base, **Render** (gratis) para el backend, **GitHub Pages** para el frontend. Deploy sale de "fuera de alcance". | Pedido por el usuario; servicios aprobados por él. Avisado: las cuentas las crea él, la app pública no tiene login (cualquiera puede editar/borrar), Render gratis "se duerme". |
| 2026-11-20 | Configuración de producción con **variables de entorno leídas con `process.env`** (sin instalar `@nestjs/config`). La contraseña de Atlas **nunca** en el chat ni en el repositorio: solo en los ajustes de Render. | Repositorio público; `@nestjs/config` sigue fuera de alcance porque no hace falta. |
| 2026-11-20 | Revisión 4.1: Claude la hace entera y presenta las correcciones juntas. | Elegido por el usuario. |
| 2026-11-20 | Errores de validación de MongoDB → **400 en español** mediante un filtro global (`mongoose-validation.filter.ts`); el DTO recorta espacios antes de validar. | La revisión encontró 3 casos que daban 500 (ver registro). |
| 2026-11-20 | El mensaje "Unexpected end of JSON input" (JSON mal formado) se deja en inglés. | Solo ocurre enviando peticiones a mano; la web siempre envía JSON correcto. |
| 2026-11-20 | Las pruebas de Claude sobre la base compartida solo tocan productos creados por él y localizados por nombre. | El usuario usa la web a la vez (creó "Almohadilla para cascos" durante la revisión). |
| 2026-11-20 | Variables de entorno del backend: `MONGODB_URI` (si falta → MongoDB local), `CORS_ORIGINS` (lista separada por comas; si falta → Live Server), `PORT` (si falta → 3000). `dbName: 'catalogo_tech'` fijo. | Mismo código en el Mac y en Render; secretos fuera del repositorio. |
| 2026-11-20 | El frontend elige la API según dónde se abra: `127.0.0.1`/`localhost` → `http://localhost:3000`; cualquier otro sitio → la dirección de Render (`PRODUCTION_API_URL`, pendiente hasta el 4.4). | Un único `app.js` para el Mac y para GitHub Pages. |
| 2026-11-20 | GitHub Pages publicará la **raíz del repositorio** (rama `main`), con `index.html` en la raíz que redirige a `frontend/` y `.nojekyll`. | Pages solo publica la raíz o `/docs`; la alternativa (GitHub Actions) exigiría ampliar los permisos del token del usuario. El repositorio ya es público, así que no se expone nada nuevo. |
| 2026-11-20 | Claude nunca hace push sin aprobación del usuario. Añadido a la regla 6 de `CLAUDE.md`. | Push publica en internet. |

---

## Entorno comprobado
| Herramienta | Estado | Versión |
|---|---|---|
| VS Code | Instalado (`~/Applications/Visual Studio Code.app`) | — |
| Extensión Live Server | Instalada | 5.7.10 |
| Node.js | Instalado (LTS) | v26.13.1 |
| Git | Ya instalado (Command Line Tools de Apple); no hizo falta instalar | 2.39.5 |
| Homebrew | **No instalado** (se verá en la fase 3) | — |
| GitHub CLI (`gh`) | No instalado (no hace falta: login con token) | — |
| NestJS (en `backend/`) | Generado con `npx @nestjs/cli new` | `@nestjs/core` 12.0.1 |
| `class-validator` / `class-transformer` (en `backend/`) | Instalados con `npm install` (paso 2.2) | 0.15.1 / 0.5.1 |
| `@nestjs/mapped-types` (en `backend/`) | Instalado por el Nest CLI al generar el recurso | — |
| `@nestjs/mongoose` / `mongoose` (en `backend/`) | Instalados con `npm install` (paso 3.2) | 12.0.1 / 9.12.2 |
| npm / npx | Instalados | 11.20.0 |
| Permisos del usuario del Mac | **No es administrador** (no puede usar `sudo` ni instalar Homebrew) | — |
| MongoDB Community (`~/mongodb`) | Instalado a mano desde `fastdl.mongodb.org` (huella sha256 comprobada). Datos en `~/mongodb-data` | 9.0.8 |
| MongoDB Compass (`~/Applications`) | Instalado a mano desde las descargas oficiales en GitHub (sha256 y firma de Apple comprobadas) | 1.53.3 |

---

## Registro por sesiones

### 2026-11-19
- **1.1 · Estructura HTML** — creado `frontend/index.html`: formulario con validación del navegador (`required`, `minlength`, `min`, `step`…) y 3 tarjetas de ejemplo escritas a mano.
  _(Reconstruido a partir de los archivos: esta sesión no quedó registrada en detalle.)_

### 2026-11-20
- La sesión empezó sin contexto de la anterior; se retomó leyendo `CLAUDE.md` y los archivos del proyecto.
- **1.2 · Estilos CSS** — creado `frontend/styles.css`, enlazado desde `index.html`. Formulario a la izquierda y tarjetas en cuadrícula a la derecha (una sola columna en pantallas estrechas). Stock 0 en rojo.
  - El usuario no sabía abrir la página con Live Server: se abrió el proyecto en VS Code y se explicaron los pasos (clic derecho → *Open with Live Server* o botón *Go Live*). Funcionó.
- **1.3 · JavaScript** — creado `frontend/app.js` (array `products`, `renderProducts()`, evento `submit` del formulario). En `index.html` se quitaron las tarjetas a mano y se añadió `<script src="app.js">`.
  - Corregido antes de probar: `form.name` devuelve el nombre del formulario, no el campo "Nombre"; se usa `form.elements.name`.
  - Verificado por el usuario: añadir productos funciona, incluido el stock 0 en rojo.
- **1.4 · Limitación** — verificado por el usuario: al recargar, los productos añadidos desaparecen (el array vive en la memoria de la pestaña).
- **Cierre de la fase 1** — `CLAUDE.md` actualizado (pasos marcados, *Cómo arrancar*, *Glosario*); copia de seguridad hecha.
- **Inicio de la fase 2** — comprobado Node.js; presentado el plan del paso 2.1 (pendiente de aprobación).
- Creada esta bitácora. Regla 11 en `CLAUDE.md`: leerla al empezar cada sesión y actualizarla tras cada paso.
- **Git** — comprobado que ya estaba instalado. `git init -b main`, autor local `Luis`, creado `.gitignore`. `CLAUDE.md` actualizado (Contexto, reglas 6, 9 y 10, Fuera de alcance, Estructura, Glosario). Primer commit: `Fase 1`.
- **2.1 · NestJS mínimo** — `npx @nestjs/cli new backend --skip-git --package-manager npm` en la raíz: creado `backend/` con sus librerías (`node_modules/`, ignorado por Git). Sin repositorio Git anidado.
  - La plantilla de NestJS 12 trae novedades respecto a lo previsto: módulos ES (los `import` acaban en `.js`), tests con Vitest (no Jest), linter oxlint y un archivo `AGENTS.md` (instrucciones para asistentes de IA). No afectan al plan.
  - Servidor arrancado con `npm run start:dev` (modo vigilancia: se reinicia al cambiar el código). Log: "Nest application successfully started".
  - Comprobado por Claude con `curl`: `GET http://localhost:3000` → `200 OK`, "Hello World!". Verificado también por el usuario en el navegador.
  - Claude explicó `main.ts` / controller / service con una analogía de restaurante; el usuario no la entendió (no tenía relación con el proyecto). Se rehízo con la tienda: abrir la tienda / dependiente / almacén.
  - **2.1 completado.** `CLAUDE.md`: paso marcado, *Cómo arrancar* (backend) y *Glosario* actualizados.
- Commit intermedio aprobado por el usuario: `Paso 2.1: proyecto NestJS mínimo`.
- El usuario aprendió a abrir la terminal de VS Code (en Mac, el menú *Terminal* está en la barra superior de la pantalla; alternativa: `Cmd + Shift + P` → "Create New Terminal") y ejecutó `git log --oneline`.
- Servidor NestJS apagado a petición del usuario.
- **GitHub** — comprobado: repositorio público y vacío; `gh` no instalado; llavero de macOS (`osxkeychain`) ya configurado para Git.
  - Email cambiado al *noreply* de GitHub y 2 commits reescritos (`git rebase --root`): `Fase 1` → `540eb65`, `Paso 2.1…` → `aade6ed`. Comprobado que el Gmail no aparece en ningún archivo ni commit.
  - `git remote add origin …` hecho. Pendiente: crear token y primer push (usuario).
  - El usuario creó un token y lo pegó en el chat. Claude **no lo usó** y recomendó revocarlo (queda guardado en el historial de la conversación) y crear uno nuevo para el push.
  - Commit `Conexión con GitHub` (cambios de `CLAUDE.md` y `BITACORA.md`), aprobado por el usuario.
  - **Primer push hecho por el usuario** (`git push -u origin main`) con su token: GitHub recibió `Fase 1`, `Paso 2.1…` y `Conexión con GitHub`.
  - El usuario hizo un commit desde el panel de Git de VS Code sin mensaje: VS Code abrió la pestaña `COMMIT_EDITMSG` y Git quedó esperando (parecía que "tardaba"). Se resolvió escribiendo el mensaje y cerrando la pestaña: commit `8455bcd Nuevos cambios en clase con TOKEN`, subido a GitHub. Comprobado: el token no está en ningún commit.
  - **Incidente:** tras ese commit, `BITACORA.md` en disco volvió a una versión antigua (probablemente se guardó una pestaña vieja abierta en VS Code). Restaurado con `git restore BITACORA.md`, con permiso del usuario. Lección: cerrar y reabrir las pestañas de archivos que Claude modifica, o no guardarlas si tienen cambios viejos.
- **Trabajo autónomo (usuario en descanso).** Revisión de la fase 1: los 4 pasos, *Cómo arrancar*, *Glosario* y commit `Fase 1` están hechos. Nada pendiente.
- **2.2 · API de productos**
  - `npx nest g resource products --no-spec --type rest --crud` en `backend/`: creó `src/products/` (module, controller, service, dto/, entities/) y lo registró en `app.module.ts`.
  - `npm install class-validator class-transformer` (aviso de `fsevents` sin importancia).
  - Escritos: `product.entity.ts` (forma del producto + lista de categorías), `create-product.dto.ts` (reglas), `update-product.dto.ts` (igual pero todo opcional), `products.service.ts` (array + CRUD + 404), `products.controller.ts` (ids como texto), `main.ts` (`ValidationPipe`).
  - Comprobado con `curl`: GET lista (más recientes primero), POST → 201, GET uno → 200, PATCH → 200 (cambia `updatedAt`), DELETE → 200, GET de uno borrado → 404, datos incorrectos o campos extra → 400 con la lista de errores.
  - Corregido: los 3 ejemplos salían desordenados (creados en el mismo milisegundo) → horas de creación escalonadas.
  - `prettier` (formato) y `npm run lint`: sin avisos.
  - **2.2 completado.** Commit local `Paso 2.2: API de productos`.
- **2.3 · Conectar frontend y backend**
  - `main.ts`: `enableCors` para el origen de Live Server.
  - `index.html`: dos zonas de mensajes (`#form-message`, `#list-message`); `styles.css`: estilos de mensajes.
  - `app.js` reescrito: `API_URL`, `loadProducts()` (GET), `createProduct()` (POST con JSON), mensajes de error. Ya no hay productos de ejemplo en el frontend: vienen del backend.
  - Comprobado por Claude con `curl`: cabeceras CORS correctas para los dos orígenes de Live Server y ninguna para otro origen; la "pregunta previa" (preflight) del POST responde 204; POST como lo haría la web → 201. Live Server (del usuario) sirve ya los archivos nuevos.
  - ⚠️ **Sin verificar en el navegador**: en el Mac no hay un navegador que Claude pueda controlar. Queda en la lista de comprobaciones del usuario.
  - `tsconfig.build.tsbuildinfo` sacado del repositorio y añadido a `.gitignore`.
  - **2.3 completado** (a falta de la comprobación visual). Commit local `Paso 2.3: conectar frontend y backend`.
- **2.4 · Editar y borrar desde la web**
  - `index.html`: título del formulario con id, botón Cancelar (oculto salvo al editar). `styles.css`: botones Editar/Borrar en cada tarjeta y borde azul en la que se edita.
  - `app.js`: `updateProduct()` (PATCH), `deleteProduct()` (DELETE con `confirm`), `startEditing()` / `stopEditing()`, un solo "escuchador" de clics en el listado.
  - Comprobado por Claude **simulando la página** con `jsdom` (navegador falso de Node, instalado solo en la carpeta temporal de Claude, no en el proyecto) contra el backend real: carga de los 3 ejemplos, crear, editar (título/botón/borde azul), guardar con stock 0 (sale en rojo), cancelar, error 400 mostrado en rojo, borrar, y aviso de "no se puede conectar" con el servidor caído. Todo correcto.
  - ⚠️ Falta la comprobación visual del usuario en el navegador real.
  - **2.4 completado.** Commit local `Paso 2.4: editar y borrar desde la web`.
- **2.5 · Limitación** — demostrado por Claude con `curl`: se creó "Producto de la demo 2.5" → 4 productos; se reinició el servidor → solo quedan los 3 de ejemplo. El array vive en la memoria del servidor y se pierde al reiniciarlo. Solución: la base de datos (fase 3).
- **Cierre de la fase 2** — `CLAUDE.md`: pasos marcados, *Cómo arrancar* (orden: backend primero) y *Glosario* actualizados. Commit local `Fase 2`. Servidor dejado **encendido** para que el usuario pruebe la web al volver.
  - Resumen de lo aprendido: el backend es un programa aparte que guarda los datos y responde peticiones HTTP; frontend y backend hablan con JSON a través de `fetch`; CORS decide qué páginas pueden hablar con el backend; la validación se repite en el backend porque el frontend se puede saltar; los datos en memoria del servidor sobreviven a recargar la página, pero no a reiniciar el servidor.
- **Vuelta del usuario.** Aprobó el push → subidos `Paso 2.2`, `Paso 2.3`, `Paso 2.4` y `Fase 2` a GitHub.
- **Mensajes en español** — `create-product.dto.ts` (mensaje en cada regla) y `main.ts` (`exceptionFactory`). Comprobado con `curl`: todos los errores 400 salen en español; el 404 ya lo estaba. Lint sin avisos.
  - Nota: al guardar cambios del backend, el servidor (modo vigilancia) se reinicia solo y **se pierden los productos añadidos** (limitación de la fase 2).
  - Commit `Mensajes de error en español` y push (aprobado por el usuario).
- **3.1 · MongoDB y Compass**
  - Comprobado: usuario sin permisos de administrador, sin Homebrew; MongoDB y Compass no instalados; puerto 27017 libre.
  - MongoDB 9.0.8 (`mongodb-macos-arm64-9.0.8.tgz`, 171 MB): descargado, sha256 correcto, descomprimido en `~/mongodb/`; creada `~/mongodb-data/`.
  - Arrancado con `--bind_ip 127.0.0.1`; luego reiniciado con `--bind_ip localhost --ipv6` para escuchar también en `::1`. Log: "Waiting for connections" en 27017.
  - Compass 1.53.3 (zip para chip Apple): sha256 correcto, copiado a `~/Applications/MongoDB Compass.app`, firma de MongoDB, Inc. aceptada por macOS.
  - ⚠️ Falta que el usuario abra Compass y se conecte (está en su lista de comprobaciones).
  - **3.1 completado** por parte de Claude. Commit local `Paso 3.1: MongoDB y Compass`.
- **3.2 · Conectar NestJS con Mongoose**
  - `npm install @nestjs/mongoose mongoose`. `npm audit` avisa de 2 fallos "high" (`tmp`, `undici`) solo en herramientas de desarrollo; con `--omit=dev` → 0. No se usa `npm audit fix --force` (podría romper versiones).
  - `app.module.ts`: `MongooseModule.forRoot('mongodb://localhost:27017/catalogo_tech')`, con comentario explicando la URI y por qué no va en `.env`.
  - Log de NestJS: "MongooseCoreModule dependencies initialized"; log de MongoDB: conexión aceptada desde `[::1]` con el driver de Mongoose (el ajuste de IPv6 del 3.1 era necesario).
  - Comprobado: `catalogo_tech` **no existe todavía** (solo `admin`, `config`, `local`): MongoDB crea la base al guardar el primer documento.
  - **3.2 completado.** Commit local `Paso 3.2: conectar NestJS con MongoDB`.
- **3.3 · Array → MongoDB**
  - Nuevos/cambiados: `schemas/product.schema.ts`, `products.module.ts` (`MongooseModule.forFeature`), `products.service.ts` (métodos `async` con el modelo de Mongoose). Borrado `entities/product.entity.ts`. El DTO importa las categorías del schema.
  - Comprobado con `curl`: GET (lista vacía), POST → 201, GET uno, PATCH (cambia `updatedAt`), 400 en español, 404 con id raro e inexistente, DELETE → 200. Mismo formato que en la fase 2.
  - Comprobado simulando la web con `jsdom`: todo funciona **sin tocar el frontend** (lista vacía → "Todavía no hay productos").
  - **3.3 completado.** Commit local `Paso 3.3: productos guardados en MongoDB`.
- **3.4 · Los datos sobreviven**
  - Creado "Producto de la demo 3.4" → reiniciado **NestJS** → sigue ahí.
  - Apagado **MongoDB** ("mongod shutdown complete"; los datos son archivos `.wt` en `~/mongodb-data`) → encendido de nuevo → el producto sigue ahí y el backend se reconectó solo.
  - Con MongoDB apagado, el backend **no responde error: se queda esperando** y contesta cuando MongoDB vuelve (en la web se vería "Cargando productos…" un rato). Anotado; no se cambia.
  - Comprobado que Mongoose **no crea** la base al arrancar el backend: `catalogo_tech` solo aparece al guardar el primer producto.
  - Base `catalogo_tech` borrada al terminar (solo tenía el producto de prueba de Claude).
  - ⚠️ Falta que el usuario lo vea en Compass (lista de comprobaciones).
  - **3.4 completado** por parte de Claude. Commit local `Paso 3.4: los datos sobreviven a los reinicios`.
- **3.5 · Repaso** — creado `README.md` en la raíz: piezas, requisitos, cómo arrancar (orden: MongoDB → backend → frontend, 2 terminales), Compass, **recorrido completo de un dato** (esquema), API, estructura y tabla "Si algo falla". `CLAUDE.md` → *Cómo arrancar* remite al README.
- **Cierre de la fase 3** — pasos marcados en `CLAUDE.md`; *Glosario* y *Cómo arrancar* al día. Commit local `Fase 3`. MongoDB y backend dejados **encendidos** para que el usuario pruebe.
  - Resumen de lo aprendido: la base de datos es una pieza más con su propio programa (`mongod`) y su puerto; el backend se conecta a ella con Mongoose y una URI; el schema define cómo se guardan los productos; al cambiar el array por MongoDB **solo cambió el backend**, el frontend quedó igual; ahora los datos sobreviven a recargar la página, a reiniciar el backend y a reiniciar la base de datos.
- Push de la fase 3 aprobado por el usuario ("hazlo tú"): subidos `Paso 3.1` … `Paso 3.4`, `Fase 3` y este último commit de la bitácora. El usuario hará las comprobaciones más tarde.
- **Compass (a petición del usuario)** — Claude abrió Compass con `open -a … --args mongodb://localhost:27017` (MongoDB registró conexiones nuevas al abrirlo; Claude no puede ver la pantalla para confirmarlo). Creó "MacBook Air 13" a través de la API (como lo haría la web): apareció la base `catalogo_tech` con la colección `products` y 1 documento (`_id` de MongoDB, `createdAt`, `updatedAt`). Falta que el usuario lo vea en la ventana de Compass.
- **Verificado por el usuario:** Compass muestra `catalogo_tech` → `products` con el producto, y la web funciona. "Está todo bien".

### 2026-11-20 (fase 4)
- Plan de la fase 4 presentado y aprobado (Atlas + Render + GitHub Pages). Commit y push de la verificación de la fase 3 aprobados.
- **4.1 · Revisión completa** (todo seguido, a petición del usuario)
  - **Errores encontrados (respondían 500 en vez de 400):** (1) nombre con espacios alrededor, p. ej. `" a "`: el DTO contaba 3 caracteres, MongoDB lo recortaba a 1 y lo rechazaba; (2) `PATCH` con `"name": null`; (3) `PATCH` con `"price": null` (el DTO de edición acepta `null` en campos opcionales y el schema lo rechazaba).
  - **Corregido:** el DTO recorta espacios antes de validar (`@Transform` de class-transformer); nuevo `src/mongoose-validation.filter.ts` registrado en `main.ts` → 400 con "El campo "x" es obligatorio" / "El valor del campo "x" no es válido"; la descripción también se recorta en el schema. Verificado con `curl`: los 3 casos dan 400 en español; lo normal sigue funcionando.
  - **Mejoras del frontend:** el botón se desactiva y dice "Guardando…" mientras se guarda (evita duplicados con doble clic; importante con Render, que tarda al despertar); si borrar falla (p. ej., 404 porque ya estaba borrado), se recarga la lista. Verificado con `jsdom`: 3 clics seguidos → 1 solo producto.
  - **Otros:** `@nestjs/mapped-types` fijado a `^12.0.1` (estaba como `*`, cualquier versión); `backend/README.md` (plantilla de NestJS en inglés) sustituido por uno corto en español; `CLAUDE.md`: nombre real de la carpeta raíz en *Estructura*, término nuevo en el *Glosario*.
  - Revisado sin problemas: seguridad del frontend (`textContent`, sin inyección de HTML), campos extra o con `$` rechazados, JSON roto → 400, cuerpo que no es un objeto → 400, ids raros → 404, CORS, documentación coherente con el código.
  - Durante la revisión apareció "Almohadilla para cascos", creado por el usuario desde la web: comprobado que no se tocó.
  - Lint sin avisos. **4.1 completado.** Commit local `Paso 4.1: revisión y correcciones`.
- **4.2 · Preparar para producción**
  - Backend: `app.module.ts` lee `MONGODB_URI` (con `dbName: 'catalogo_tech'`); `main.ts` lee `CORS_ORIGINS` y `PORT`; `package.json` declara `"engines": {"node": ">=22"}` para Render.
  - Frontend: `app.js` con `IS_LOCAL` / `PRODUCTION_API_URL`; mensajes adaptados (aviso de "servidor dormido" en internet).
  - Raíz: `index.html` (redirige a `frontend/`) y `.nojekyll`.
  - Comprobado: `npm run build` + `node dist/main.js` en el puerto 3100 con variables de ejemplo → lee de `catalogo_tech`, CORS solo para los orígenes indicados (Live Server no, como debe ser). Simulación con `jsdom`: en `127.0.0.1` usa `localhost:3000` y pinta la lista; en `github.io` usa la dirección de Render y muestra el aviso. En local todo sigue igual.
  - **4.2 completado.** Commit local `Paso 4.2: preparar para producción`.
- Comprobado en internet (2026-11-20): Atlas M0 y Render free siguen siendo gratis y, según la mayoría de fuentes, sin tarjeta. Render free se duerme a los 15 min; Atlas M0 se pausa tras 30 días sin uso.
- **4.3 · Atlas** — el usuario creó la cuenta, el clúster M0, el usuario `catalogo_app`, el acceso `0.0.0.0/0` y obtuvo la cadena de conexión (opción *Drivers*). Decidido **no guardar la contraseña** en el ordenador de clase (Notas sería visible para otros): se copiará directamente de Atlas a Render; si se pierde, se crea otra en *Database Access*. Atlas avisa de "contact information" incompleta: es opcional, se ignora.
- Push de `Paso 4.1`, `Paso 4.2` y la bitácora, aprobado por el usuario (Render descarga el código desde GitHub).
- **4.4 · Render (en curso)** — primer deploy fallido: `npm error Missing script: "buildyarn"`. Causa: la casilla *Build Command* traía `yarn` por defecto y se quedó pegado al comando (`npm run buildyarn`). El código está bien: Claude reprodujo en el Mac la instalación y compilación desde una copia limpia de GitHub y funcionan. Solución: borrar la casilla entera y escribir `npm ci && npm run build`; revisar igual *Start Command*.
  - El usuario pidió las instrucciones completas de una vez (pegar errores uno a uno le confundía). Lección para Claude: dar la lista completa de pasos de una sola vez y pedir el bloque entero del log, no línea a línea.
  - Segundo intento: *Build Command* con errata `ppm` → corregido a `npm ci && npm run build`.
  - Tercer intento: **compila y arranca**, pero `MongoParseError: Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://"` → el **valor** de `MONGODB_URI` en Render no empieza por `mongodb+srv://` (espacio, comillas, texto de más…). El nombre de la variable sí es correcto (si no, el backend habría intentado el MongoDB local).
  - El usuario pegó en el chat su cadena de Atlas **con la contraseña** (no se copia aquí). Problemas vistos: la contraseña sigue entre `<` `>` (hay que quitarlos) y fue inventada en Render sin ponerla en Atlas. El usuario de Atlas se llama `luisdanielcastano2000_db_user` (no `catalogo_app`; vale igual). Recomendado: poner en Atlas una contraseña **nueva**, solo letras y números (la anterior quedó expuesta en el chat), y usar esa misma en Render.
  - Siguiente intento: la cadena ya se interpreta bien, pero `ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR` (tlsv1 alert internal error) al conectar con Atlas. Es el síntoma típico de que **Atlas rechaza la IP** de Render: falta `0.0.0.0/0` en *Network Access* (o aún no estaba activo). Indicado al usuario cómo añadirlo.
- **Pausa de fin de semana** (pedida por el usuario). Creado `RETOMAR.md` con el prompt para el lunes, el estado exacto de Render/Atlas y la lista de lo que queda. Seguridad pendiente de confirmar: que la contraseña nueva de Atlas (solo letras y números) esté puesta en Atlas y en Render, ya que la anterior apareció en el chat.
