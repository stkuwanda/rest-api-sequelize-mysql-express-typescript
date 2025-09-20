import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

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

  // More routes will be added here
  // Error handling will be added here
	return app;
};
