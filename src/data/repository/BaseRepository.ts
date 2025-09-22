import { Sequelize } from 'sequelize-typescript';
import config from '../../config';

export default class BaseRepository {
	sequelizeClient: Sequelize;
	defaultLimit = 100;

	constructor() {
		this.sequelizeClient = new Sequelize({
			host: config.db.host,
			port: config.db.port,
			database: config.db.database,
			username: config.db.username,
			password: config.db.password,
			dialect: 'mysql',
      models: [__dirname + '/../models'], // Path to your models
		});
	}
}

export type Constructor<T = {}> = new (...args: any[]) => T;
