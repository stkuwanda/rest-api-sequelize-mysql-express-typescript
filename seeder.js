// seeder.js
// This file is used to run seeders from the command line
// It uses ts-node to execute TypeScript code directly
require('ts-node/register');
require('./src/umzug').seeder.runAsCLI();
