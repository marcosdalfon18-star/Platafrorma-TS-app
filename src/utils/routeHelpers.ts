import { Request, Response, NextFunction } from 'express';

/**
 * Utility functions for route handling
 */

/**
 * Async handler wrapper to catch errors in async route handlers
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Create a response formatter
 */
export const formatResponse = (success: boolean, data: any, message?: string) => {
  return {
    success,
    message,
    data,
    timestamp: new Date().toISOString()
  };
};

/**
 * Create a paginated response
 */
export const paginateResponse = (
  items: any[], 
  page: number = 1, 
  limit: number = 10
) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  return {
    data: items.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(items.length / limit),
      totalItems: items.length,
      itemsPerPage: limit
    }
  };
};

/**
 * Extract pagination params from request
 */
export const getPaginationParams = (req: Request) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  return { page, limit };
};

/**
 * Route path builder
 */
export class RoutePathBuilder {
  private basePath: string = '';
  
  setBasePath(path: string): this {
    this.basePath = path;
    return this;
  }
  
  build(path: string): string {
    return `${this.basePath}${path}`.replace(/\/+/g, '/');
  }
}
