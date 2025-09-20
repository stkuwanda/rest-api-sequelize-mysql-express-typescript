const config = {
	db: {
		host: process.env.DB_HOST || 'localhost',
		port: parseInt(process.env.DB_PORT || '3306', 10),
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME || 'test_db',
	},
};

export default config;
