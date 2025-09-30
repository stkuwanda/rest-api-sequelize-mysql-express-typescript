import { Express, Request, Response } from 'express';
import { asyncHandler } from '../utils/error-utils';
import repository from '../data/repository';

export const createPostRoutes = (app: Express) => {
	// Create a new post for a user
	app.post(
		'/posts',
		asyncHandler(async (req: Request, res: Response) => {
			const userId = req.body.user_id;
			const postPayload = {
				title: req.body.title,
				body: req.body.content,
			};
			const tags = req.body.tags; // Expecting an array of tag names
			const user = await repository.getUserById(userId);

			if (!user) {
				return res.status(404).json({ error: 'Not found!' });
			}

			const post = await repository.createUserPost(user, postPayload, tags);
			res.status(201).json({ post });
		})
	);

	// Get posts for a specific user
	app.get(
		'/users/:id/posts',
		asyncHandler(async (req: Request, res: Response) => {
			const userId = parseInt(req.params.id, 10);
			const user = await repository.getUserById(userId); // Fetching the user first then fetching posts associated with the user is called lazy loading.

			if (!user) {
				return res.status(404).json({ error: { message: 'Not found!' } });
			}

			const posts = await repository.getPostsByUser(user);
			res.status(200).json({ posts });
		})
	);

	// Get all posts with their authors (eager loading example)
	app.get(
		'/posts',
		asyncHandler(async (req: Request, res: Response) => {
			const posts = await repository.getPosts(); // Fetching posts along with their associated user (author) data is called eager loading.
			res.status(200).json({ posts });
		})
	);
};
