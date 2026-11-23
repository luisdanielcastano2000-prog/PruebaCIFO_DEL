# Retomar el proyecto (lunes)

## 1. Prompt para pegar al empezar

Abre Claude Code y pega esto tal cual:

```
Seguimos con el proyecto Catálogo Tech, en ~/Documents/proyectos/actividad_01.
Antes de nada, lee CLAUDE.md, BITACORA.md y RETOMAR.md.
Estamos en la fase 4, paso 4.4: el backend ya compila y arranca en Render, pero no conecta
con MongoDB Atlas (error ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR, que indica que Atlas no deja
entrar a Render). Ayúdame a terminar el 4.4 y luego sigue con el 4.5 (GitHub Pages) y el 4.6.
Dame siempre todos los pasos de una vez, no error por error.
```

Si el lunes usas **otro ordenador**, cambia la primera línea por:
`El proyecto está en GitHub: https://github.com/luisdanielcastano2000-prog/PruebaCIFO_DEL — clónalo y seguimos.`
(Para el deploy no hace falta tener MongoDB instalado en ese ordenador: Render y Atlas están en internet).

## 2. Dónde nos quedamos

| Pieza | Servicio | Estado |
|---|---|---|
| Base de datos | MongoDB Atlas (Cluster0, M0 gratis) | ✅ Creada. Usuario: `luisdanielcastano2000_db_user` |
| Backend | Render (`catalogo-tech-api`, Free, Frankfurt) → `https://pruebacifo-del.onrender.com` | ✅ Funciona (paso 4.4 hecho 2026-11-23) |
| Frontend | GitHub Pages | ⏳ Paso 4.5: dirección de Render ya puesta en `app.js`; falta activar Pages |

Ajustes de Render que **ya están bien** (no tocar):

| Casilla | Valor |
|---|---|
| Root Directory | `backend` |
| Build Command | `npm ci && npm run build` |
| Start Command | `npm run start:prod` |
| Variable `CORS_ORIGINS` | `https://luisdanielcastano2000-prog.github.io` |
| Variable `MONGODB_URI` | `mongodb+srv://luisdanielcastano2000_db_user:CONTRASEÑA@cluster0.nxseptm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0` (con la contraseña real, sin `<` `>`) |

## 3. Lo primero que haremos el lunes

1. **Atlas → Security → Network Access**: comprobar que existe `0.0.0.0/0` en estado **Active**. Si no está: *+ Add IP Address → Allow Access from Anywhere → Confirm*.
2. **Atlas → Security → Database Access**: confirmar que la contraseña de `luisdanielcastano2000_db_user` es **nueva** (la anterior apareció en el chat) y **solo letras y números**. La misma tiene que estar en `MONGODB_URI` de Render.
3. **Render → Manual Deploy → Deploy latest commit** y esperar a **Live** 🟢.
4. Abrir `https://<dirección de Render>/products` → debe salir `[]`.
5. Pasarle a Claude la dirección de Render (no es secreta) para el paso 4.5.

## 4. Qué queda después

- **4.5 · GitHub Pages:** Claude pone la dirección de Render en `frontend/app.js` y hace push; tú activas Pages en GitHub (*Settings → Pages → Deploy from a branch → main / (root) → Save*). La web quedará en `https://luisdanielcastano2000-prog.github.io/PruebaCIFO_DEL/`.
- **4.6 · Comprobación final:** crear, editar y borrar desde la web publicada; ver los datos en Atlas; README con las direcciones públicas; commit y push.

## 5. Recordatorios

- **Contraseñas y tokens: nunca en el chat.** Si hay que revisar la cadena de Atlas, pégala con `XXXX` en lugar de la contraseña.
- En los logs de Render no aparece la contraseña: se pueden copiar enteros.
- Render gratis "se duerme" tras 15 minutos sin visitas: la primera carga puede tardar ~1 minuto.
- Para usar el proyecto **en local** (no hace falta para el deploy): ver `README.md` → *Cómo arrancar el proyecto*.
