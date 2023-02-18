const { Pool } = require('pg');
const postgresqlConfig = require('./config');

const pool = new Pool(postgresqlConfig);

function getProductsQuery(page, count, callback) {
  pool.query(`SELECT * FROM products LIMIT ${page * count}`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(res.rows);
    }
  });
}

function getProductByIdQuery(product_id, callback) {
  pool.query(`SELECT * FROM products WHERE id = [${product_id}]`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(res.rows);
    }
  });
}

function getRelatedProductQuery(product_id, callback) {
  pool.query(`SELECT related_product_id FROM related WHERE current_product_id = [${product_id}]`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(res.rows);
    }
  });
}

function getProductStyleQuery(product_id, callback) {
  pool.query(`SELECT * FROM styles WHERE product_id = [${product_id}]`, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(res.rows);
    }
  });
}

pool.end();

module.exports = {
  getProductsQuery,
  getProductByIdQuery,
  getRelatedProductQuery,
  getProductStyleQuery,
};
