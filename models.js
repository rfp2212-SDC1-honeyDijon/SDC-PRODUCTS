const db = require('./database');

const getProducts = (count, page) => db.query(`SELECT * FROM products LIMIT ${count} OFFSET ${(page - 1) * count}`)
  .then((results) => results.rows ?? [])
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
(SELECT json_agg(
  json_build_object(
    'feature', f.name,
    'value', f.value
  )
)
FROM features f 
WHERE f.product_id = p.id
) AS features
FROM products p
WHERE p.id = ${productId}
GROUP BY p.id
`)
  .then((results) => results.rows[0] ?? [])
  .catch((error) => {
    throw new Error(`Error retrieving product ${productId}, error message: ${error.message}`);
  });

const getStyles = (productId) => db.query(`SELECT
s.product_id,
json_agg(
  json_build_object(
    'style_id', s.id,
    'name', s.name,
    'original_price', s.original_price,
    'sale_price', s.sale_price,
    'default?', s.is_default,
    'photos', (
      SELECT json_agg(
        json_build_object(
          'thumbnail_url', p.thumbnail_url,
          'url', p.url
        )
      )
      FROM photos p
      WHERE p.style_id = s.id
    ),
    'skus', (
      SELECT json_object_agg(
        sk.id::text,
        json_build_object(
          'quantity', sk.quantity,
          'size', sk.size
        )
      )
      FROM skus sk
      WHERE sk.style_id = s.id
    )
  )
) AS results
FROM styles s
WHERE s.product_id = ${productId}
GROUP BY s.product_id;
`)
  .then((results) => results.rows[0] ?? [])
  .catch((error) => {
    throw new Error(`Error retrieving product ${productId}, error message: ${error.message}`);
  });

const getRelated = (productId) => db.query(`SELECT array_agg(related_product_id) FROM related WHERE current_product_id = ${productId}`)
  .then((results) => results.rows[0].array_agg ?? [])
  .catch((error) => {
    throw new Error(`Error retrieving product ${productId}, error message: ${error.message}`);
  });

module.exports = {
  getProducts,
  getProduct,
  getStyles,
  getRelated,
};