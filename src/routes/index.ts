import { Express } from 'express';
import { createUserRoutes } from './user';

export const createRoutes = (app: Express) => {
  createUserRoutes(app);
}