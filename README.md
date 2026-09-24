# Mi ritmo

Plan personal de comidas, guardias y entrenamiento. Adaptable a computadoras y teléfonos, con calendario por fecha, menú editable, listas semanales, porciones y seguimiento de peso/cintura. Todos los alimentos excluidos del plan original se omiten del contenido.

## Abrir el proyecto

Requiere Node.js 22.12 o superior.

```sh
npm ci
npm run dev
```

Sin configuración abre en modo local: guarda solamente en este navegador y lo indica en pantalla. No se presenta como guardado en la nube. El menú es orientativo, no calcula calorías.

## Conectar tu Supabase

1. En tu proyecto de Supabase, abrí **SQL Editor**, pegá `supabase/schema.sql` y ejecutalo. Crea la tabla, las reglas de acceso personal y el guardado con control de versiones.
2. Copiá `.env.example` a `.env.local`. Completá `VITE_SUPABASE_URL` con la URL del proyecto y `VITE_SUPABASE_PUBLISHABLE_KEY` con la clave **publishable** (o la antigua **anon**). Son valores públicos del cliente. Nunca pongas `service_role`, una secret key ni la contraseña de la base de datos en variables VITE.
3. En **Authentication → URL Configuration**, agregá `http://localhost:5173` y `http://127.0.0.1:5173` a las URL permitidas para desarrollo.
4. Reiniciá el servidor. Entrá por **Mi cuenta** y usá el enlace recibido por correo. Los proveedores de correo integrados pueden limitar destinatarios/envíos; configurá SMTP en Supabase si tu proyecto lo requiere.
5. Comprobá que tu usuario vea sus registros y que un segundo usuario no pueda leerlos. Las reglas RLS están en el archivo SQL; no hay acceso anónimo a la tabla.

Los registros locales y de cuenta están separados. **Mi cuenta → Copiar mi prueba local** permite copiar la prueba a una cuenta vacía. Los cambios sin conexión quedan pendientes en el navegador y se reintentan al volver la conexión. Un conflicto entre dos dispositivos se muestra y no sobrescribe silenciosamente lo guardado: descargá un respaldo y resolvelo desde Mi cuenta. Las distintas fechas se guardan por separado.

## Subir a Vercel

1. Subí este proyecto a un repositorio propio y elegí **Add New → Project → Import** en Vercel, o usá `npx vercel` desde la carpeta si preferís la terminal.
2. Framework: **Vite**. Build: `npm run build`. Output: `dist`.
3. Agregá las dos variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` en las variables de entorno de Vercel antes de publicar.
4. Publicá. En Supabase, configurá la URL final `https://tu-proyecto.vercel.app` como **Site URL** y agregala a **Redirect URLs**. Agregá el dominio propio si usás uno.
5. Probá el enlace de acceso desde la web publicada, marcá una comida y comprobá en otro dispositivo con la misma cuenta. Las vistas actualizan al recuperar el foco. No hay sincronización en tiempo real mientras dos ventanas permanecen abiertas.
6. Si modificás variables en Vercel, volvé a desplegar para incorporarlas.

No está publicado automáticamente ni conectado a una cuenta de Supabase: estos pasos necesitan tu proyecto y su configuración.

## Verificación

```sh
npm test
npm run build
```

La base de datos real y el envío de correo requieren una cuenta configurada para probarse de extremo a extremo. El SQL incluye separación por usuario y control de versión por registro. El respaldo descargable es JSON para conservar tus registros, no una importación automática.

## Fuentes y fotografía

- Menú y preferencias: conversación «Crear dieta argentina», con las cenas livianas y exclusiones finales.
- Alimentación: https://www.argentina.gob.ar/node/92458
- Viandas: https://www.argentina.gob.ar/node/109157
- Fotografía de omelette: Helin Gezer / Pexels, https://www.pexels.com/photo/a-plate-with-a-salad-and-an-omelette-25748212/ (licencia Pexels).
- Supabase: https://supabase.com/docs/guides/auth/row-level-security
- Vercel: https://vercel.com/docs/frameworks/frontend/vite
