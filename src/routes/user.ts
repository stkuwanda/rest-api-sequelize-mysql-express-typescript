import { Express, Request, Response } from 'express';
import repository from '../data/repository';

export const createUserRoutes = (app: Express) => {
	// Create a new user
	app.post('/users', async (req: Request, res: Response) => {
		try {
			const { name, email } = req.body;
			const newUser = await repository.createUser({ name, email });
			res.status(201).json(newUser);
		} catch (error) {
			console.error('Error creating user:', error);
			res.status(400).json({ error: {message: error instanceof Error ? error.message : 'There was an error creating the user.'} });
		}
	});

	// Get all users
	app.get('/users', async (req: Request, res: Response) => {
		try {
			const users = await repository.getUsers();
			res.status(200).json(users);
		} catch (error) {
			console.error('Error fetching users:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});

	// Get user by ID
	app.get('/users/:id', async (req: Request, res: Response) => {
		try {
			const userId = parseInt(req.params.id, 10);
			const user = await repository.getUserById(userId);
			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({ error: 'User not found' });
			}
		} catch (error) {
			console.error('Error fetching user:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
};
