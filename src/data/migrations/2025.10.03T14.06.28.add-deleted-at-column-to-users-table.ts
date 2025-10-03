import { DataTypes } from 'sequelize';
import type { Migration } from '../../umzug';

export const up: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().addColumn('users', 'deleted_at', {
		type: DataTypes.DATE,
		allowNull: true, // Allow null values for existing records
	});
};

export const down: Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().removeColumn('users', 'deleted_at');
};
