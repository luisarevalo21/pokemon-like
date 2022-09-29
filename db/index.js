const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  localhost: process.env.DB_HOST,
  database: "pokemon",
  password: "",
  port: process.env.DB_PORT,
});

module.exports = pool;
