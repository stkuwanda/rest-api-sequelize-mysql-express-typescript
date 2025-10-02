# REST API with Sequelize, MySQL, Express, and TypeScript

This project is a RESTful API built with Express.js, Sequelize ORM, MySQL, and TypeScript. It provides a modular structure for managing users, posts, tags, and their relationships, with support for database migrations.

## Features
- User, Post, Tag, and Post-Tag models
- Modular repository pattern
- Error handling middleware
- Database migrations with Umzug
- TypeScript for type safety

## Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn
- MySQL server

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd rest-api-sequelize-mysql-express-typescript
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure environment
Edit `src/config.ts` to set your MySQL database credentials and other configuration as needed.

### 4. Run Database Migrations
This project uses [Umzug](https://github.com/sequelize/umzug) for migrations. Migration scripts are located in `src/data/migrations/`.

#### To run all migrations:
```bash
npm run migrate
```

#### To create a new migration file on first run:
```bash
npm run migrate:create -- --name example-name-table.ts --folder src/data/migrations
```

#### To create a new migration file on second run:
```bash
npm run migrate:create -- --name example2-name-table.ts
```

#### To revert migrations:
```bash
npm run migrate:rollback
```

### 5. Start the Server
```bash
npm start
```
Or for development with auto-reload (if nodemon is installed):
```bash
npm run dev
```

### 6. API Usage
Use the endpoints defined in `src/routes/` for interacting with users, posts, and tags. You can test the API using the provided `api-test.http` file or tools like Postman.

## Project Structure
```
rest-api-sequelize-mysql-express-typescript/
├── src/
│   ├── config.ts
│   ├── index.ts
│   ├── server.ts
│   ├── umzug.ts
│   ├── data/
│   │   ├── migrations/
│   │   ├── models/
│   │   └── repository/
│   ├── middleware/
│   ├── routes/
│   └── utils/
├── migrate.js
├── package.json
├── tsconfig.json
├── docker-compose.yaml
└── api-test.http
```

## Scripts
- `npm start` — Start the server
- `npm run dev` — Start the server in development mode
- `npm run migrate` — Run database migrations

## License
MIT
