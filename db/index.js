const { Client } = require("pg");
const Pool = require("pg").Pool;

require("dotenv").config();

const devConfig = {
  user: process.env.PG_USER,
  localhost: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// const productionConfig = {
//   user: process.env.PG_USER,
//   localhost: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
//   ssl: true,

//   //   const client = new pg.Client({
//   //     user: "admin",
//   //     password: "guest",
//   //     database: "Employees",
//   //     port: 5432,
//   //     host: "localhost",
//   //     ssl: true
//   // })
//   // client.connect();
// };

if (process.env.NODE_ENV) {
  // client.connect();
}
//

// const = require("pg");
// const connectionString = process.env.DATABASE_URL;
// const pool = new Pool({
//   connectionString: connectionString,
// });

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.PG_PASS,
//   port: process.env.DB_PORT,
// });

module.exports = client.connect();
