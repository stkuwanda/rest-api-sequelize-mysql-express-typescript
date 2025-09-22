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
			res.status(400).json({
				error: {
					message:
						error instanceof Error
							? error.message
							: 'There was an error creating the user.',
				},
			});
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

	// Update user by ID
	app.put('/users/:id', async (req: Request, res: Response) => {
		try {
			const userId = parseInt(req.params.id, 10);
			const userPayload = {
				name: req.body.name,
				email: req.body.email,
			};
      console.log('userPayload: \n', userPayload);

			const updatedUser = await repository.updateUser(userId, userPayload);
			res.status(200).json({ user: updatedUser });
		} catch (error) {
			console.error('Error updating user:', error);
			res.status(400).json({
				error:
					error instanceof Error
						? error.message
						: 'There was an error updating the user.',
			});
		}
	});

	// Delete user by ID
	app.delete('/users/:id', async (req: Request, res: Response) => {
		try {
			const userId = parseInt(req.params.id, 10);
			const deletedCount = await repository.deleteUser(userId);

			if (deletedCount) {
				res.status(204).json({ user_deleted: deletedCount });
			} else {
				res.status(404).json({ error: 'User not found' });
			}
		} catch (error) {
			console.error('Error deleting user:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	});
};
