const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "sanikaaa",
  host: "localhost",
  port: 5432,
  database: "crudpostress"
});

module.exports = pool;