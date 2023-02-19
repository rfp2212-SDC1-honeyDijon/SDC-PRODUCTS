const db = require('../database');

const getProducts = (count, page) => db.query(`SELECT * FROM products LIMIT ${count} OFFSET ${(page - 1) * count}`)
  .then((results) => results.rows)
  .catch((error) => {
    throw new Error(`Error retrieving products, error message: ${error.message}`);
  });

const getProduct = (productId) => db.query(`SELECT
p.id,
p.name,
p.slogan,
p.description,
p.category,
p.default_price,
json_agg(
  json_build_object(
    'feature', f.name,
    'value', f.value
  )
) AS features
FROM products p
LEFT JOIN features f ON p.id = f.product_id
WHERE p.id = ${productId}
GROUP BY p.id
`)
  .then((results) => results.rows[0])
  .catch((error) => {
    throw new Error(`Error retrieving product ${productId}, error message: ${error.message}`);
  });

// TODO getStyles
const getStyles = (productId) => db.query('SELECT * FROM styles LIMIT 1')
  .then((results) => results.rows[0])
  .catch((error) => {
    throw new Error(`Error retrieving product ${productId}, error message: ${error.message}`);
  });

const getRelated = (productId) => db.query(`SELECT array_agg(related_product_id) FROM related WHERE current_product_id = ${productId}`)
  .then((results) => results.rows[0].array_agg)
  .catch((error) => {
    throw new Error(`Error retrieving product ${productId}, error message: ${error.message}`);
  });

module.exports = {
  getProducts,
  getProduct,
  getStyles,
  getRelated,
};
