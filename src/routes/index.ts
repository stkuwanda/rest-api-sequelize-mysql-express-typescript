import { Express } from 'express';
import { createUserRoutes } from './user';
import { createPostRoutes } from './post';

export const createRoutes = (app: Express) => {
  createUserRoutes(app);
  createPostRoutes(app);
}