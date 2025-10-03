// src/data/seeders/2025.10.03T16.34.42.users-posts-tags-seeder.ts
import { Seeder } from '../../umzug';
import { faker } from '@faker-js/faker';

// Sample data for users, posts, tags, and post_tags
// In a real scenario, you might want to generate more complex or random data

// Static user data (commented out to use faker for dynamic generation)
// const users = [
// 	{
// 		id: 1,
// 		name: 'Alice',
// 		email: 'alice@email.com',
// 		created_at: new Date(),
// 		updated_at: new Date(),
// 	},
// 	{
// 		id: 2,
// 		name: 'Bob',
// 		email: 'bob@email.com',
// 		created_at: new Date(),
// 		updated_at: new Date(),
// 	},
// 	{
// 		id: 3,
// 		name: 'Charlie',
// 		email: 'charlie@email.com',
// 		created_at: new Date(),
// 		updated_at: new Date(),
// 	},
// ];

// Generate 10 users with faker
const users = Array.from({ length: 10 }).map((_, index) => ({
	id: index + 1,
	name: faker.person.firstName(),
	email: faker.internet.email(),
	created_at: new Date(),
	updated_at: new Date(),
}));



// const posts = [
// 	{
// 		id: 1,
// 		title: 'First Post',
// 		body: 'This is the content of the first post.',
// 		slug: 'first-post',
// 		user_id: users[0].id,
// 		created_at: new Date(),
// 		updated_at: new Date(),
// 	},
// 	{
// 		id: 2,
// 		title: 'Second Post',
// 		body: 'This is the content of the second post.',
// 		slug: 'second-post',
// 		user_id: users[1].id,
// 		created_at: new Date(),
// 		updated_at: new Date(),
// 	},
// 	{
// 		id: 3,
// 		title: 'Third Post',
// 		body: 'This is the content of the third post.',
// 		slug: 'third-post',
// 		user_id: users[2].id,
// 		created_at: new Date(),
// 		updated_at: new Date(),
// 	},
// ];

// Generate 10 posts with faker
// const posts = Array.from({ length: 10 }).map((_, index) => ({
// 	id: index + 1,
// 	title: faker.lorem.sentence(),
// 	body: faker.lorem.paragraphs(2),
// 	slug: faker.lorem.slug(),
// 	user_id: users[Math.floor(Math.random() * users.length)].id,
// 	created_at: new Date(),
// 	updated_at: new Date(),
// }));

// Generate 10 posts with faker, ensuring unique titles for better slugs
const posts = Array.from({ length: 10 }).map((_, index) => {
	const title = faker.book.title();
	return {
		id: index + 1,
		title,
		body: faker.lorem.paragraph(),
		slug: faker.helpers.slugify(title).toLowerCase(),
		user_id: faker.helpers.arrayElement(users).id, // Randomly assign a user_id
		created_at: new Date(),
		updated_at: new Date(),
	};
});

// const tags = [
// 	{ id: 1, name: 'Technology', created_at: new Date(), updated_at: new Date() },
// 	{ id: 2, name: 'Health', created_at: new Date(), updated_at: new Date() },
// 	{ id: 3, name: 'Lifestyle', created_at: new Date(), updated_at: new Date() },
// ];

// Generate 10 tags with faker
const tags = Array.from({ length: 10 }).map((_, index) => ({
	id: index + 1,
	name: faker.word.noun(), // faker.lorem.word() is deprecated, using faker.word.noun() instead
	created_at: new Date(),
	updated_at: new Date(),
}));

// const postTags = [
// 	{ post_id: posts[0].id, tag_id: tags[0].id },
// 	{ post_id: posts[0].id, tag_id: tags[2].id },
// 	{ post_id: posts[1].id, tag_id: tags[1].id },
// ];

// Generate postTags by assigning 3 random tags to each post
const postTags = posts.map((post) => {
	const randomTags = faker.helpers.arrayElements(tags, 3); // Assign 3 random tags to each post

	// Create post_tag entries
	return randomTags.map((tag) => ({
		post_id: post.id,
		tag_id: tag.id,
	}));
}).flat(); // Flatten the array of arrays

// Seeder function to insert the data
// Note: The order of insertion matters due to foreign key constraints.
export const up: Seeder = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().bulkInsert('users', users);
	await sequelize.getQueryInterface().bulkInsert('posts', posts);
	await sequelize.getQueryInterface().bulkInsert('tags', tags);
	await sequelize.getQueryInterface().bulkInsert('post_tag', postTags);
};

// Rollback function to delete the seeded data
// Note: This is a simple rollback that deletes all entries from the tables.
// Reverse order to avoid foreign key constraint issues.
export const down: Seeder = async ({ context: sequelize }) => {
	await sequelize
		.getQueryInterface()
		.bulkDelete('post_tag', { post_id: posts.map((post) => post.id) }); // Remove associations first
	await sequelize
		.getQueryInterface()
		.bulkDelete('tags', { id: tags.map((tag) => tag.id) }); // Then remove tags
	await sequelize
		.getQueryInterface()
		.bulkDelete('posts', { id: posts.map((post) => post.id) }); // Then remove posts
	await sequelize
		.getQueryInterface()
		.bulkDelete('users', { id: users.map((user) => user.id) }); // Finally remove users
};
