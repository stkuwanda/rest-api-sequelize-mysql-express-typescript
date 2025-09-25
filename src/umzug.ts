import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize, Options } from 'sequelize';
import config from './config';

// Initialize Sequelize
const sequelizeOptions: Options = config.db;
const sequelize = new Sequelize(sequelizeOptions);

// Initialize Umzug migrator
export const migrator = new Umzug({
	migrations: { glob: ['', { cwd: __dirname }] },
	context: sequelize,
	storage: new SequelizeStorage({
		sequelize,
		tableName: 'migrations',
	}),
	logger: console,
});

// Export the type for a migration
export type Migration = typeof migrator._types.migration;
