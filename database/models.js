const { Pool } = require('pg');
const postgresqlConfig = require('./config.js');

const pool = new Pool(postgresqlConfig);

pool.query('SELECT * FROM products', (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res.rows);
  }
});

pool.end();
