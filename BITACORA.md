# Bitácora · Catálogo Tech

Registro de lo que hacemos y de las decisiones que tomamos, para no perder contexto entre sesiones.
El plan completo y las reglas de trabajo están en `CLAUDE.md`; aquí va **lo que ha pasado de verdad**.

---

## Estado actual
- **Fase:** 2 · Backend (NestJS). Sin empezar.
- **Siguiente paso:** 2.1 · Generar el proyecto NestJS y comprobar que responde en `http://localhost:3000`.
- **Pendiente de decidir:** aprobar el plan del 2.1 y quién arranca el servidor: Claude (en segundo plano) o el usuario en su propia pestaña de terminal (recomendado).
- **Control de versiones:** Git en local, rama `main`. Commit `Fase 1` = estado al cerrar la fase 1.
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

---

## Entorno comprobado
| Herramienta | Estado | Versión |
|---|---|---|
| VS Code | Instalado (`~/Applications/Visual Studio Code.app`) | — |
| Extensión Live Server | Instalada | 5.7.10 |
| Node.js | Instalado (LTS) | v26.13.1 |
| Git | Ya instalado (Command Line Tools de Apple); no hizo falta instalar | 2.39.5 |
| Homebrew | **No instalado** (se verá en la fase 3) | — |
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
