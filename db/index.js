const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: process.env.DB_USER,
//   localhost: process.env.DB_HOST,
//   database: "pokemon",
//   password: "",
//   port: process.env.DB_PORT,
// });
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_ENDPOINT,
  database: process.env.PG_DB,
  password: process.env.PG_PASS,
  port: process.env.PG_PORT,
});

module.exports = pool;
