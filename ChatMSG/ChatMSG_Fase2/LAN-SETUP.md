# ChatMSG Fase 2 — Red local (esta PC = servidor)

Esta guía asume que **esta computadora** corre **Redis + backend Node** y (opcionalmente) **Vite**. La **otra PC** solo necesita el navegador o, si quieres un segundo nodo Node, el mismo repositorio con variables distintas.

## En esta PC (servidor)

### 1. Redis escuchando en la LAN

Para que otra máquina pueda usar Redis (segundo nodo Node) o para diagnóstico:

- En `redis.conf`: `bind` debe permitir la IP LAN (p. ej. `0.0.0.0` o tu IP) y usa **`requirepass`**.
- Firewall de macOS: permite conexiones entrantes al puerto **6379** solo desde la red local.
- Prueba en esta PC: `redis-cli ping` → `PONG`.

### 2. Variables de entorno (`server/.env` o export)

Copia `server/.env.example` y ajusta:

- **`REDIS_URL`**: normalmente `redis://:PASSWORD@127.0.0.1:6379` en el servidor.
- **`SESSION_SECRET`**: un secreto largo; **el mismo** si más adelante corres otro Node en la otra PC.
- **`CLIENT_ORIGIN`**: lista separada por **comas** con:
  - `http://localhost:5173`
  - `http://127.0.0.1:5173`
  - **`http://TU_IP_LAN:5173`** (sustituye por la IP que muestra esta máquina en la red, p. ej. `192.168.1.10`)

Sin la IP en `CLIENT_ORIGIN`, el navegador en la otra PC será bloqueado por CORS.

Para saber tu IP en macOS: **Ajustes del sistema → Red** o en terminal: `ipconfig getifaddr en0` (Wi‑Fi).

### 3. Arrancar el backend

```bash
cd server
npm start
```

### 4. Arrancar el frontend accesible en la LAN

En `vite.config.js` ya está `server.host: true`. Arranca:

```bash
cd client
npm run dev
```

Vite mostrará algo como **Network: http://192.168.x.x:5173/**. Esa URL es la que debes añadir en `CLIENT_ORIGIN` (mismo host y puerto).

---

## En la otra PC

### Opción A — Solo usar el chat en el navegador (lo más simple)

1. Conectada a la **misma WiFi / LAN**.
2. Abre el navegador en: **`http://IP_DE_LA_PC_SERVIDOR:5173`** (la que muestra Vite en “Network”).
3. No hace falta instalar Node ni Redis en la otra máquina.

Si no carga: revisa firewall en la PC servidor y que `CLIENT_ORIGIN` incluya exactamente esa URL.

### Opción B — Segundo servidor Node (clúster de 2 instancias)

En la otra PC, clona el mismo proyecto y en **`server`**:

```bash
export REDIS_URL='redis://:TU_PASSWORD@IP_DE_LA_PC_SERVIDOR:6379'
export SESSION_SECRET='el-mismo-que-en-el-servidor'
export PORT=3051
export CLIENT_ORIGIN='http://localhost:5173'
npm start
```

En esa máquina el front puede ser Vite en local; el origen será `http://localhost:5173`, por eso `CLIENT_ORIGIN` en **esa** instancia puede ser solo localhost. Los mensajes en tiempo real se comparten porque **ambos Node** usan el mismo Redis.

---

## Resumen

| Dónde | Qué |
|--------|-----|
| **PC servidor** | Redis + `npm start` en `server` + `npm run dev` en `client` con IP en `CLIENT_ORIGIN` |
| **Otra PC** | Opción A: solo navegador a `http://IP_SERVIDOR:5173`. Opción B: otro `npm start` con `REDIS_URL` apuntando al servidor |

Los navegadores **no** se conectan a Redis; solo tus procesos **Node** usan `REDIS_URL`.

---

## Si Firefox en la otra PC no abre la página

1. **`vite.config.js`** debe tener `allowedHosts: true` (ya está en este repo); sin eso Vite responde **403 / “Blocked request”** al usar la IP en lugar de `localhost`. Reinicia `npm run dev` tras actualizar.
2. **Firewall en la Mac servidor** (Ajustes del sistema → Red → Firewall): permite **Node** o desactiva el firewall un momento para probar.
3. **URL exacta**: `http://TU_IP:5173` con **http**, mismo puerto que muestra la consola de Vite (“Network”).
4. **`CLIENT_ORIGIN`** del backend debe incluir esa misma URL (`http://TU_IP:5173`).
5. **Wi‑Fi con “aislamiento de cliente”** (invitados, algunos routers): impide que dos PCs se vean; prueba otra red o cable.
