import express, { Application } from 'express';
import { RouteController } from './controllers/RouteController';
import { publicRoutes, apiRoutes } from './routes';
import { loggingMiddleware, errorHandler, corsMiddleware } from './middleware';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(loggingMiddleware);

// Initialize route controller
const routeController = new RouteController();

// Register public routes
publicRoutes.forEach(route => {
  routeController.registerRoute(route);
});

// Register API routes with /api prefix
routeController.registerRouteGroup({
  prefix: '/api',
  routes: apiRoutes
});

// Use the configured router
app.use(routeController.getRouter());

// Error handling middleware (should be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('\n📋 Registered routes:');
  const routes = routeController.listRoutes();
  routes.forEach(route => {
    console.log(`  ${route.method.padEnd(6)} ${route.path}`);
  });
  console.log('\n✅ Route control system initialized successfully');
});

export default app;
