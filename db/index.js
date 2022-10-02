const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  localhost: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.PG_PASS,
//   port: process.env.DB_PORT,
// });

module.exports = pool;
