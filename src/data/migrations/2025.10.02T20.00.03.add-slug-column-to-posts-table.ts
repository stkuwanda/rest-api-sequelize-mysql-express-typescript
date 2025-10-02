import { DataTypes } from 'sequelize';
import type { Migration } from '../../umzug';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().addColumn('posts', 'slug', {
		type: DataTypes.STRING,
		unique: true,
		allowNull: true, // Temporarily allow nulls for existing records
		after: 'body', // Position the new column after the 'body' column
	} as any);
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().removeColumn('posts', 'slug');
};
