import { createServer } from './server';
import repository from './data/repository';

const server = createServer();

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
	try {
		// Test the database connection
		// await repository.sequelizeClient.authenticate();
		// console.log('Database connection has been established successfully.');

		// Sync all defined models to the DB
		await repository.sequelizeClient.sync();
		console.log('All models were synchronized and migrated successfully.');
	} catch (error) {
		console.error('Unable to sync or migrate tables: ', error);
		process.exit(1);
	}

	console.log(`Server is running on http://localhost:${PORT}`);
});
