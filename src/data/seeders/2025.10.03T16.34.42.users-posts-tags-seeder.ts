import { title } from 'process';
import { Seeder } from '../../umzug';

const users = [
	{
		id: 1,
		name: 'Alice',
		email: 'alice@email.com',
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		id: 2,
		name: 'Bob',
		email: 'bob@email.com',
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		id: 3,
		name: 'Charlie',
		email: 'charlie@email.com',
		created_at: new Date(),
		updated_at: new Date(),
	},
];

const posts = [
	{
		id: 1,
		title: 'First Post',
		body: 'This is the content of the first post.',
		slug: 'first-post',
		user_id: users[0].id,
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		id: 2,
		title: 'Second Post',
		body: 'This is the content of the second post.',
		slug: 'second-post',
		user_id: users[1].id,
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		id: 3,
		title: 'Third Post',
		body: 'This is the content of the third post.',
		slug: 'third-post',
		user_id: users[2].id,
		created_at: new Date(),
		updated_at: new Date(),
	},
];

const tags = [
	{ id: 1, name: 'Technology', created_at: new Date(), updated_at: new Date() },
	{ id: 2, name: 'Health', created_at: new Date(), updated_at: new Date() },
	{ id: 3, name: 'Lifestyle', created_at: new Date(), updated_at: new Date() },
];

const postTags = [
	{ post_id: posts[0].id, tag_id: tags[0].id },
	{ post_id: posts[0].id, tag_id: tags[2].id },
	{ post_id: posts[1].id, tag_id: tags[1].id },
];

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
