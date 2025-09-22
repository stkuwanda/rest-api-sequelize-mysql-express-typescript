import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createRoutes } from './routes';

export const createServer = () => {
	const app = express();
	app.disable('x-powered-by');

	// Middleware chain
	app
		.use(morgan('dev'))
		.use(cors())
		.use(express.urlencoded({ extended: true }))
		.use(express.json())
		.use(express.static('public'))
		.use(cors());

	// Routes
	app.get('/health', (req: Request, res: Response) => {
		res.json({ ok: true });
	});

  // Import and use routes
	createRoutes(app);
	
  // Error handling will be added here
	return app;
};
