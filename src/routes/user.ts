import { Express, Request, Response } from 'express';
import { asyncHandler } from '../utils/error-utils';
import repository from '../data/repository';

export const createUserRoutes = (app: Express) => {
	// Create a new user
	app.post(
		'/users',
		asyncHandler(async (req: Request, res: Response) => {
			const { name, email } = req.body;
			const newUser = await repository.createUser({ name, email });
			res.status(201).json(newUser);
		})
	);

	// Get all users
	app.get(
		'/users',
		asyncHandler(async (req: Request, res: Response) => {
			const users = await repository.getUsers();
			res.status(200).json(users);
		})
	);

	// Get user by ID
	app.get(
		'/users/:id',
		asyncHandler(async (req: Request, res: Response) => {
			const userId = parseInt(req.params.id, 10);
			const user = await repository.getUserById(userId);

			if (user) {
				// res.status(200).json(user);
				res.status(200).json({
					user: { ...user?.get(), original_name: user?.getDataValue('name') },
				});
			} else {
				res.status(404).json({ error: 'User not found' });
			}
		})
	);

	// Get user by ID including soft-deleted users
	app.get(
		'/users/with-soft-deletes/:id',
		asyncHandler(async (req: Request, res: Response) => {
			const userId = parseInt(req.params.id, 10);
			const user = await repository.getUserByIdIncludeSoftDeletes(userId);

			if (user) {
				// res.status(200).json(user);
				res.status(200).json({
					user: { ...user?.get(), original_name: user?.getDataValue('name') },
				});
			} else {
				res.status(404).json({ error: 'User not found' });
			}
		})
	);

	// Update user by ID
	app.put(
		'/users/:id',
		asyncHandler(async (req: Request, res: Response) => {
			const userId = parseInt(req.params.id, 10);
			const userPayload = {
				name: req.body.name,
				email: req.body.email,
			};

			const updatedUser = await repository.updateUser(userId, userPayload);
			res.status(200).json({ user: updatedUser });
		})
	);

	// Delete user by ID
	app.delete(
		'/users/:id',
		asyncHandler(async (req: Request, res: Response) => {
			const userId = parseInt(req.params.id, 10);
			const deletedCount = await repository.deleteUser(userId);

			if (deletedCount) {
				res.json({ user_deleted: deletedCount });
			} else {
				res.status(404).json({ error: 'User not found' });
			}
		})
	);
};
