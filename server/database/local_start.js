/* jshint esversion: 8 */
// Starts an in-memory MongoDB and then the API (used for local development without Docker).
const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
  const mongod = await MongoMemoryServer.create({ instance: { port: 27018 } });
  process.env.MONGO_URL = mongod.getUri();
  console.log('In-memory MongoDB running at ' + process.env.MONGO_URL);
  require('./app.js');
})();
