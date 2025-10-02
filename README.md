# Platafrorma-TS-app

Plataforma TypeScript con sistema de control de rutas robusto y escalable.

## 🚀 Características

- **Control de Rutas Completo**: Sistema de gestión de rutas con soporte para grupos y middleware
- **TypeScript**: Código completamente tipado para mayor seguridad
- **Middleware Personalizable**: Sistema de middleware flexible para validación, autenticación y logging
- **Rutas Protegidas**: Soporte integrado para rutas con autenticación
- **API RESTful**: Estructura de API REST bien organizada

## 📁 Estructura del Proyecto

```
src/
├── types/           # Definiciones de tipos TypeScript
│   └── routes.ts    # Tipos para configuración de rutas
├── controllers/     # Controladores de la aplicación
│   └── RouteController.ts  # Controlador principal de rutas
├── middleware/      # Middleware personalizado
│   └── index.ts     # Logging, validación, CORS, etc.
├── routes/          # Definiciones de rutas
│   └── index.ts     # Rutas públicas y API
└── index.ts         # Punto de entrada de la aplicación
```

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Compilar TypeScript
npm run build

# Iniciar la aplicación
npm start

# Modo desarrollo (con ts-node)
npm run dev
```

## 📋 Rutas Disponibles

### Rutas Públicas
- `GET /` - Página de inicio con información de la API
- `GET /health` - Estado de salud del servidor

### Rutas API
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear nuevo usuario (requiere: name, email)
- `PUT /api/users/:id` - Actualizar usuario (requiere: name, email)
- `DELETE /api/users/:id` - Eliminar usuario
- `GET /api/protected` - Ruta protegida (requiere autenticación)

## 🔐 Autenticación

Para acceder a rutas protegidas, incluye el header de autorización:

```bash
Authorization: Bearer <tu-token>
```

## 🎯 Uso del Sistema de Rutas

### Registrar una Ruta Simple

```typescript
import { RouteConfig } from './types/routes';

const route: RouteConfig = {
  path: '/example',
  method: 'GET',
  handler: (req, res) => {
    res.json({ message: 'Example route' });
  }
};

routeController.registerRoute(route);
```

### Registrar Grupo de Rutas

```typescript
import { RouteGroup } from './types/routes';

const apiRoutes: RouteGroup = {
  prefix: '/api',
  routes: [
    {
      path: '/users',
      method: 'GET',
      handler: getUsersHandler
    }
  ]
};

routeController.registerRouteGroup(apiRoutes);
```

### Agregar Middleware

```typescript
const protectedRoute: RouteConfig = {
  path: '/protected',
  method: 'GET',
  handler: protectedHandler,
  middleware: [validateBody(['token'])],
  protected: true
};
```

## 🧪 Ejemplos de Peticiones

### Crear Usuario
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

### Acceder a Ruta Protegida
```bash
curl http://localhost:3000/api/protected \
  -H "Authorization: Bearer your-token-here"
```

## 📝 Características del Sistema de Control de Rutas

1. **Tipado Fuerte**: Todas las rutas están completamente tipadas con TypeScript
2. **Middleware Flexible**: Sistema de middleware en cascada
3. **Validación**: Validación automática de campos requeridos
4. **Autenticación**: Soporte integrado para rutas protegidas
5. **Logging**: Registro automático de todas las peticiones
6. **CORS**: Configuración CORS incluida
7. **Manejo de Errores**: Sistema centralizado de manejo de errores

## 🔧 Configuración

El servidor se ejecuta en el puerto `3000` por defecto. Puedes cambiarlo estableciendo la variable de entorno `PORT`:

```bash
PORT=8080 npm start
```

## 📚 Documentación Adicional

Para más información sobre cómo extender el sistema de rutas, consulta los archivos en el directorio `src/`:

- `types/routes.ts` - Interfaces y tipos
- `controllers/RouteController.ts` - Lógica del controlador
- `middleware/index.ts` - Middleware disponible

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, asegúrate de que tu código esté bien tipado y siga las convenciones del proyecto.