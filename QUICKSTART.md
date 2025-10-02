# Quick Start Guide

Esta guía te ayudará a comenzar rápidamente con Platafrorma-TS-app.

## Requisitos Previos

- Node.js v18 o superior
- npm v8 o superior

## Instalación Rápida

1. **Clonar el repositorio**
```bash
git clone https://github.com/marcosdalfon18-star/Platafrorma-TS-app.git
cd Platafrorma-TS-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Compilar el proyecto**
```bash
npm run build
```

4. **Iniciar el servidor**
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## Modo Desarrollo

Para ejecutar en modo desarrollo con recarga automática:

```bash
npm run dev
```

## Verificar la Instalación

Prueba que el servidor está funcionando:

```bash
curl http://localhost:3000/
```

Deberías recibir una respuesta JSON con información sobre los endpoints disponibles.

## Primeros Pasos

### 1. Explorar los Endpoints

Visita `http://localhost:3000/` en tu navegador o usa curl:

```bash
curl http://localhost:3000/
```

Esto te mostrará todos los endpoints disponibles.

### 2. Probar las Rutas API

**Obtener usuarios:**
```bash
curl http://localhost:3000/api/users
```

**Crear un usuario:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Tu Nombre","email":"tu@email.com"}'
```

### 3. Probar Rutas Protegidas

Las rutas protegidas requieren autenticación:

```bash
# Sin token - falla
curl http://localhost:3000/api/protected

# Con token - funciona
curl http://localhost:3000/api/protected \
  -H "Authorization: Bearer tu-token-aqui"
```

## Estructura del Proyecto

```
src/
├── controllers/          # Controladores de rutas
│   └── RouteController.ts
├── middleware/          # Middleware personalizado
│   └── index.ts
├── routes/             # Definiciones de rutas
│   └── index.ts
├── types/              # Tipos TypeScript
│   └── routes.ts
├── utils/              # Utilidades
│   └── routeHelpers.ts
└── index.ts            # Punto de entrada
```

## Crear tu Primera Ruta

1. **Define el handler en `src/routes/index.ts`:**

```typescript
const miRutaHandler = (req: Request, res: Response): void => {
  res.json({ mensaje: 'Mi primera ruta personalizada' });
};
```

2. **Agrega la configuración de ruta:**

```typescript
export const misRutas: RouteConfig[] = [
  {
    path: '/mi-ruta',
    method: 'GET',
    handler: miRutaHandler
  }
];
```

3. **Registra las rutas en `src/index.ts`:**

```typescript
import { misRutas } from './routes';

misRutas.forEach(route => {
  routeController.registerRoute(route);
});
```

4. **Recompila y prueba:**

```bash
npm run build
npm start
curl http://localhost:3000/mi-ruta
```

## Agregar Middleware

Para agregar validación u otro middleware a una ruta:

```typescript
{
  path: '/mi-ruta',
  method: 'POST',
  handler: miHandler,
  middleware: [validateBody(['campo1', 'campo2'])]
}
```

## Crear Rutas Protegidas

Para crear una ruta que requiere autenticación:

```typescript
{
  path: '/admin',
  method: 'GET',
  handler: adminHandler,
  protected: true
}
```

## Agrupar Rutas

Para agrupar rutas con un prefijo común:

```typescript
routeController.registerRouteGroup({
  prefix: '/api/v2',
  routes: [
    { path: '/users', method: 'GET', handler: getUsersV2 },
    { path: '/posts', method: 'GET', handler: getPostsV2 }
  ]
});
```

## Próximos Pasos

1. Explora `src/examples/routeExample.ts` para ver más ejemplos
2. Lee la documentación completa en `API.md`
3. Revisa el README.md para características avanzadas
4. Personaliza el middleware en `src/middleware/index.ts`

## Comandos Útiles

```bash
# Instalar dependencias
npm install

# Compilar TypeScript
npm run build

# Iniciar servidor producción
npm start

# Iniciar servidor desarrollo
npm run dev

# Ejecutar tests
npm test
```

## Solución de Problemas

### El servidor no inicia
- Verifica que el puerto 3000 esté disponible
- Cambia el puerto: `PORT=8080 npm start`

### Errores de compilación TypeScript
- Ejecuta `npm run build` para ver los errores
- Verifica que todas las dependencias estén instaladas

### Rutas no funcionan
- Verifica que la ruta esté registrada en `src/index.ts`
- Revisa los logs del servidor para ver errores

## Recursos Adicionales

- [Documentación de Express](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)

## Soporte

Si encuentras problemas, abre un issue en el repositorio de GitHub.
