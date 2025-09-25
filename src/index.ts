import { createServer } from './server';

const server = createServer();

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
