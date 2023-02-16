const { Pool } = require('pg');
const postgresqlConfig = require('./config');

const pool = new Pool(postgresqlConfig);

// `products` is the db name
pool.query('SELECT * FROM products', (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res.rows);
  }
});

function getProducts(page, count) {
  pool.query('SELECT * FROM products', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.rows);
    }
  });
}

function getProductById(product_id) {
  pool.query('SELECT * FROM products', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.rows);
    }
  });
}

function getRelatedProduct(product_id) {
  pool.query('SELECT * FROM products', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.rows);
    }
  });
}

function getProductStyle(product_id) {
  pool.query('SELECT * FROM products', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.rows);
    }
  });
}

pool.end();

module.exports = {
  getProducts,
  getProductById,
  getRelatedProduct,
  getProductStyle,
};
