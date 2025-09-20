import { createServer } from './server';
import repository from './data/repository';

const server = createServer();

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
	try {
		// Test the database connection
		await repository.sequelizeClient.authenticate();
		console.log('Database connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
	console.log(`Server is running on http://localhost:${PORT}`);
});
