import { Request, Response } from 'express';
import { RouteConfig } from '../types/routes';
import { validateBody } from '../middleware';

// Home route
const homeHandler = (req: Request, res: Response): void => {
  res.json({ 
    message: 'Welcome to Platafrorma-TS-app',
    version: '1.0.0',
    endpoints: {
      home: 'GET /',
      health: 'GET /health',
      users: 'GET /api/users',
      userById: 'GET /api/users/:id',
      createUser: 'POST /api/users',
      updateUser: 'PUT /api/users/:id',
      deleteUser: 'DELETE /api/users/:id',
      protected: 'GET /api/protected'
    }
  });
};

// Health check route
const healthHandler = (req: Request, res: Response): void => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
};

// Get all users
const getUsersHandler = (req: Request, res: Response): void => {
  res.json({ 
    users: [
      { id: 1, name: 'User 1', email: 'user1@example.com' },
      { id: 2, name: 'User 2', email: 'user2@example.com' }
    ]
  });
};

// Get user by ID
const getUserByIdHandler = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.json({ 
    user: { id: parseInt(id), name: `User ${id}`, email: `user${id}@example.com` }
  });
};

// Create user
const createUserHandler = (req: Request, res: Response): void => {
  const { name, email } = req.body;
  res.status(201).json({ 
    message: 'User created successfully',
    user: { id: Date.now(), name, email }
  });
};

// Update user
const updateUserHandler = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { name, email } = req.body;
  res.json({ 
    message: 'User updated successfully',
    user: { id: parseInt(id), name, email }
  });
};

// Delete user
const deleteUserHandler = (req: Request, res: Response): void => {
  const { id } = req.params;
  res.json({ 
    message: 'User deleted successfully',
    userId: parseInt(id)
  });
};

// Protected route
const protectedHandler = (req: Request, res: Response): void => {
  res.json({ 
    message: 'This is a protected route',
    user: 'Authenticated user'
  });
};

export const publicRoutes: RouteConfig[] = [
  {
    path: '/',
    method: 'GET',
    handler: homeHandler
  },
  {
    path: '/health',
    method: 'GET',
    handler: healthHandler
  }
];

export const apiRoutes: RouteConfig[] = [
  {
    path: '/users',
    method: 'GET',
    handler: getUsersHandler
  },
  {
    path: '/users/:id',
    method: 'GET',
    handler: getUserByIdHandler
  },
  {
    path: '/users',
    method: 'POST',
    handler: createUserHandler,
    middleware: [validateBody(['name', 'email'])]
  },
  {
    path: '/users/:id',
    method: 'PUT',
    handler: updateUserHandler,
    middleware: [validateBody(['name', 'email'])]
  },
  {
    path: '/users/:id',
    method: 'DELETE',
    handler: deleteUserHandler
  },
  {
    path: '/protected',
    method: 'GET',
    handler: protectedHandler,
    protected: true
  }
];
