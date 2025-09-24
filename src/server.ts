import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createRoutes } from './routes';
import errorHandler from './middleware/error-handler';

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

	// 404 handler
	app.use((req: Request, res: Response) => {
		res.status(404).json({ error: 'Not Found' });
	});

	app.use(errorHandler); // Centralized error handling middleware

	return app;
};
