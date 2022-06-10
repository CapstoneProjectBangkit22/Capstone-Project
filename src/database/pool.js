const { Pool } = require('pg');

const connectionString = process.env.DB_URL;

module.exports = new Pool({
  connectionString,
});
