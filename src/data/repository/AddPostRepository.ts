import { Model } from 'sequelize';
import Post from '../models/Post';
import Tag from '../models/Tag';
import User from '../models/User';
import BaseRepository, { Constructor } from './BaseRepository';

// Mixin to add post-related methods to the base repository
export function AddPostRepository<TBase extends Constructor<BaseRepository>>(
	Base: TBase
) {
	return class extends Base {
		// Create a new post associated with a user
		async createUserPost(
			user: User,
			postAttributes: { title: string; body: string },
			tagNames?: string[]
		) {
			const post = await user.$create('post', postAttributes); // Using the association method to create a post for the user

			// If tag names are provided, find or create tags and associate them with the post
			if (tagNames) {
				const tags = await Promise.all(
					tagNames.map(async (name) => {
						const [tag] = await Tag.upsert({ name });
						return tag;
					})
				);

				await post.$set('tags' as keyof Model, tags); // Set the tags for the post using the association method
				await post.reload({
					include: [
						{
							model: Tag,
							as: 'tags',
							through: { attributes: [] }, // Exclude junction table attributes
						},
					],
				}); // Reload the post to include the associated tags. This ensures the response contains the tags. This is an example of eager loading.
			}

			return post;
		}

		// Get posts for a specific user
		// Lazy loading example: Fetch posts for a user using the association method.
		async getPostsByUser(user: User) {
			return user.$get('posts', {
				limit: this.defaultLimit,
				include: [
					{
						model: Tag,
						as: 'tags',
						through: { attributes: [] }, // Exclude junction table attributes
					},
				],
			}); // Using the association method to get posts for the user
		}

		getPosts() {
			// Eager loading example: Fetch posts along with their associated user (author) data
			return Post.findAll({
				limit: this.defaultLimit,
				include: [
					{ model: User, as: 'author', attributes: ['id', 'name'] },
					{
						model: Tag,
						as: 'tags',
						through: { attributes: [] }, // Exclude junction table attributes
					},
				], // Include associated user (author) data. This is an example of eager loading.
			});
		}

		// New method to get posts by tag ID
		async getPostsByTagId(tagId: number) {
			const tag = await Tag.findByPk(tagId);

			// If the tag doesn't exist throw an error
			if (!tag) {
				throw new Error('Tag not found!');
			}

			// Using the association method to get posts for the tag
			return tag.$get('posts', {
				limit: this.defaultLimit,
				include: [
					{ model: User, as: 'author', attributes: ['id', 'name'] }, // Include author details
					{
						model: Tag,
						as: 'tags',
						through: { attributes: [] }, // Exclude junction table attributes
					},
				],
				joinTableAttributes: [], // Exclude junction table attributes
			} as any); // Type assertion to any to bypass type issues
		}
	};
}
