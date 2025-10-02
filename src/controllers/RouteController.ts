import { Router, Request, Response, NextFunction } from 'express';
import { RouteConfig, RouteGroup } from '../types/routes';

export class RouteController {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  /**
   * Register a single route
   */
  public registerRoute(config: RouteConfig): void {
    const { path, method, handler, middleware = [], protected: isProtected = false } = config;
    
    const handlers = [...middleware];
    
    if (isProtected) {
      // Add authentication middleware for protected routes
      handlers.push(this.authMiddleware);
    }
    
    handlers.push(handler);

    switch (method) {
      case 'GET':
        this.router.get(path, ...handlers);
        break;
      case 'POST':
        this.router.post(path, ...handlers);
        break;
      case 'PUT':
        this.router.put(path, ...handlers);
        break;
      case 'DELETE':
        this.router.delete(path, ...handlers);
        break;
      case 'PATCH':
        this.router.patch(path, ...handlers);
        break;
    }
  }

  /**
   * Register a group of routes with a common prefix
   */
  public registerRouteGroup(group: RouteGroup): void {
    const { prefix, routes, middleware = [] } = group;
    
    routes.forEach(route => {
      const fullPath = `${prefix}${route.path}`;
      const routeMiddleware = [...middleware, ...(route.middleware || [])];
      
      this.registerRoute({
        ...route,
        path: fullPath,
        middleware: routeMiddleware
      });
    });
  }

  /**
   * Basic authentication middleware
   */
  private authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized: No token provided' });
      return;
    }
    
    // In a real application, verify the token here
    // For now, we just check if it exists
    next();
  }

  /**
   * Get the configured router
   */
  public getRouter(): Router {
    return this.router;
  }

  /**
   * List all registered routes
   */
  public listRoutes(): Array<{ method: string; path: string }> {
    const routes: Array<{ method: string; path: string }> = [];
    
    this.router.stack.forEach((layer: any) => {
      if (layer.route) {
        const methods = Object.keys(layer.route.methods);
        methods.forEach(method => {
          routes.push({
            method: method.toUpperCase(),
            path: layer.route.path
          });
        });
      }
    });
    
    return routes;
  }
}
