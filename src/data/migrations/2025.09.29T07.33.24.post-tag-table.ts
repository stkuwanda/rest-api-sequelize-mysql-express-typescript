import { DataTypes, Sequelize } from 'sequelize';
import type { Migration } from '../../umzug';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().createTable('post_tag', {
		post_id: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: false,
			references: {
				model: 'posts',
				key: 'id',
			},
			primaryKey: true,
			onDelete: 'CASCADE', // When a post is deleted, remove associated entries
			onUpdate: 'CASCADE', // Update foreign keys on post ID change
		},
		tag_id: {
			type: DataTypes.BIGINT.UNSIGNED,
			allowNull: false,
			references: {
				model: 'tags',
				key: 'id',
			},
			primaryKey: true,
			onDelete: 'CASCADE', // When a tag is deleted, remove associated entries
			onUpdate: 'CASCADE', // Update foreign keys on tag ID change
		},
	});
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().dropTable('post_tag');
};
