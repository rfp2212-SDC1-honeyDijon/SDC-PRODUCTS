const {
  getProductsQuery, getProductByIdQuery, getRelatedProductQuery, getProductStyleQuery,
} = require('../../database/index');

module.exports = {
  getProducts: (page = 1, count = 5, callback) => {
    getProductsQuery(page, count, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result.rows);
      }
    });
  },

  getProductById: (product_id, callback) => {
    getProductByIdQuery(product_id, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result.rows);
      }
    });
  },

  getRelatedProduct: (product_id, callback) => {
    getRelatedProductQuery(product_id, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result.rows);
      }
    });
  },

  getProductStyle: (product_id, callback) => {
    getProductStyleQuery(product_id, (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result.rows);
      }
    });
  },
};
