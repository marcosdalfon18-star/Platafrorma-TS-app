import { Request, Response, NextFunction } from 'express';

export interface RouteConfig {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  handler: (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
  middleware?: Array<(req: Request, res: Response, next: NextFunction) => void | Promise<void>>;
  protected?: boolean;
}

export interface RouteGroup {
  prefix: string;
  routes: RouteConfig[];
  middleware?: Array<(req: Request, res: Response, next: NextFunction) => void | Promise<void>>;
}
