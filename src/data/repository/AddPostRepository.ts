import Post from '../models/Post';
import User from '../models/User';
import BaseRepository, { Constructor } from './BaseRepository';

// Mixin to add post-related methods to the base repository
export function AddPostRepository<TBase extends Constructor<BaseRepository>>(
	Base: TBase
) {
	return class extends Base {
		// Create a new post associated with a user
		createUserPost(
			user: User,
			postAttributes: { title: string; body: string }
		) {
			return user.$create('post', postAttributes); // Using the association method to create a post for the user
		}

		// Get posts for a specific user
		// Lazy loading example: Fetch posts for a user using the association method.
		async getPostsByUser(user: User) {
			return user.$get('posts', { limit: this.defaultLimit }); // Using the association method to get posts for the user
		}

		getPosts() {
			// Eager loading example: Fetch posts along with their associated user (author) data
			return Post.findAll({
				limit: this.defaultLimit,
				include: [{ model: User, as: 'author', attributes: ['id', 'name'] }], // Include associated user (author) data. This is an example of eager loading.
			});
		}
	};
}
