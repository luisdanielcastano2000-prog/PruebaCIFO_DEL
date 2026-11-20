# Bitácora · Catálogo Tech

Registro de lo que hacemos y de las decisiones que tomamos, para no perder contexto entre sesiones.
El plan completo y las reglas de trabajo están en `CLAUDE.md`; aquí va **lo que ha pasado de verdad**.

---

## Estado actual
- **Fase:** 2 · Backend (NestJS). Sin empezar.
- **Siguiente paso:** 2.2 · API de productos (CRUD en memoria). ⛔ **No empezar hasta que el usuario lo diga.**
- **Procesos corriendo:** ninguno. El servidor NestJS se apagó a petición del usuario mientras esperamos (para encenderlo: ver *Cómo arrancar* en `CLAUDE.md`).
- **Pendiente de decidir:** nada.
- **Control de versiones:** Git, rama `main`. Commits: `Fase 1` y `Paso 2.1: proyecto NestJS mínimo`. Remoto `origin` = GitHub (público), conectado. **Primer push pendiente**: el usuario debe revocar el token expuesto en el chat, crear uno nuevo y ejecutar `git push -u origin main` en su terminal.
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
