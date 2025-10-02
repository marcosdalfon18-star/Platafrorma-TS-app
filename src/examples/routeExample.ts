import { RouteController } from '../controllers/RouteController';
import { RouteConfig, RouteGroup } from '../types/routes';
import { Request, Response, NextFunction } from 'express';

/**
 * Example: How to use the Route Control System
 */

// 1. Create a new RouteController instance
const routeController = new RouteController();

// 2. Define a simple route
const simpleRoute: RouteConfig = {
  path: '/example',
  method: 'GET',
  handler: (req: Request, res: Response) => {
    res.json({ message: 'This is a simple route example' });
  }
};

// 3. Define a protected route
const protectedRoute: RouteConfig = {
  path: '/admin',
  method: 'GET',
  handler: (req: Request, res: Response) => {
    res.json({ message: 'Admin area - you are authenticated' });
  },
  protected: true // This will require authentication
};

// 4. Define a route with validation middleware
const createItemRoute: RouteConfig = {
  path: '/items',
  method: 'POST',
  handler: (req: Request, res: Response) => {
    const { title, description } = req.body;
    res.status(201).json({ 
      message: 'Item created',
      item: { id: Date.now(), title, description }
    });
  },
  middleware: [
    (req: Request, res: Response, next: NextFunction) => {
      // Custom validation middleware
      if (!req.body.title || !req.body.description) {
        res.status(400).json({ error: 'Title and description are required' });
        return;
      }
      next();
    }
  ]
};

// 5. Define a group of related routes
const productRoutes: RouteGroup = {
  prefix: '/products',
  routes: [
    {
      path: '',
      method: 'GET',
      handler: (req: Request, res: Response) => {
        res.json({ products: [] });
      }
    },
    {
      path: '/:id',
      method: 'GET',
      handler: (req: Request, res: Response) => {
        res.json({ product: { id: req.params.id } });
      }
    },
    {
      path: '',
      method: 'POST',
      handler: (req: Request, res: Response) => {
        res.status(201).json({ message: 'Product created' });
      },
      protected: true
    }
  ],
  // Middleware that applies to all routes in this group
  middleware: [
    (req: Request, res: Response, next: NextFunction) => {
      console.log('Product route accessed:', req.path);
      next();
    }
  ]
};

// 6. Register routes
routeController.registerRoute(simpleRoute);
routeController.registerRoute(protectedRoute);
routeController.registerRoute(createItemRoute);
routeController.registerRouteGroup(productRoutes);

// 7. Get the configured router to use in your app
const router = routeController.getRouter();

// 8. List all registered routes
const allRoutes = routeController.listRoutes();
console.log('Registered routes:', allRoutes);

export { routeController, router };
