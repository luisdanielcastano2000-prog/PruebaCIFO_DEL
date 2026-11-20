# Bitácora · Catálogo Tech

Registro de lo que hacemos y de las decisiones que tomamos, para no perder contexto entre sesiones.
El plan completo y las reglas de trabajo están en `CLAUDE.md`; aquí va **lo que ha pasado de verdad**.

---

## Estado actual
- **Fase:** 2 · Backend (NestJS). En curso (trabajo autónomo de Claude).
- **Siguiente paso:** 2.4 · Editar y borrar desde la web.
- **Procesos corriendo:** servidor NestJS (`npm run start:dev` en `backend/`, arrancado por Claude en segundo plano), puerto 3000.
- **Pendiente de decidir:** nada.
- **Control de versiones:** Git, rama `main`, conectada con GitHub (`origin`, público). Último commit subido: `8cd33b2 Bitácora: GitHub conectado`. Para subir nuevos commits basta `git push` (el login quedó guardado en el llavero).
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
| npm / npx | Instalados | 11.20.0 |
| MongoDB, Compass | Sin comprobar (fase 3) | — |

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
