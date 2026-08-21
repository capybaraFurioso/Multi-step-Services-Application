# Multi-step Services Application

Aplicación React para completar y enviar una solicitud de servicio en cinco pasos, con validación por esquema, persistencia temporal y consumo de una API HTTP local.

## Stack

- React 19 + TypeScript
- React Hook Form
- Zod
- React Router
- Vite 8 + Tailwind CSS 4
- API Node.js sin dependencias externas

## Funcionalidades

- Pasos de datos personales, dirección, servicio, documentos y revisión.
- Validación independiente por paso con Zod.
- Errores de campo integrados con React Hook Form.
- Borrador en `localStorage` con escritura diferida y recuperación automática.
- Carga de documentos con estados visuales.
- Envío HTTP real a `POST /api/applications`.
- Estados de carga, respuesta exitosa, errores de validación y fallos de red.
- Toasts, error boundary y navegación protegida entre pasos.
- Layout adaptable para escritorio y móvil.

## Ejecutar

Instala dependencias:

```bash
npm install
```

Inicia la API en una terminal:

```bash
npm run api
```

Inicia Vite en otra terminal:

```bash
npm run dev
```

Vite reenvía `/api/*` a `http://127.0.0.1:8787`. Para otro backend, define `VITE_APPLICATIONS_API_URL`.

## Validar producción

```bash
npm run lint
npm test
npm run build
```

Estado verificado en agosto de 2026: lint y build pasan sin errores.

## Contrato de API

`POST /api/applications`

- `201`: solicitud aceptada con `applicationId` y `submittedAt`.
- `400`: JSON inválido, payload incompleto o cuerpo mayor de 1 MB.
- `404`: ruta inexistente.
- `405`: método no permitido.

La API incluida conserva los datos solo durante la solicitud; funciona como contrato de integración para esta demostración y no afirma persistencia en una base de datos.
