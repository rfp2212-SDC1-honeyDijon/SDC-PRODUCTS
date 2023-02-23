DROP DATABASE IF EXISTS products;
CREATE DATABASE products;

\c products;

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50),
  slogan VARCHAR(500),
  description VARCHAR(500),
  category VARCHAR(50),
  default_price VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS features (
  id INTEGER PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  name VARCHAR(50),
  value VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS styles (
  id INTEGER PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  name VARCHAR(50),
  sale_price VARCHAR(50),
  original_price VARCHAR(50),
  is_default BOOLEAN
);

CREATE TABLE IF NOT EXISTS photos (
  id INTEGER PRIMARY KEY,
  style_id INTEGER REFERENCES styles(id),
  url TEXT,
  thumbnail_url TEXT
);

CREATE TABLE IF NOT EXISTS skus (
  id INTEGER PRIMARY KEY,
  quantity INTEGER,
  size VARCHAR(10),
  style_id INTEGER REFERENCES styles(id)
);

CREATE TABLE IF NOT EXISTS characteristics (
  id INTEGER PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS related (
  id INTEGER PRIMARY KEY,
  current_product_id INTEGER,
  related_product_id INTEGER
);

CREATE INDEX products_idx ON products(id);
CREATE INDEX features_idx ON features(id);
CREATE INDEX styles_idx ON styles(id);
CREATE INDEX related_idx ON related(id);

COPY products(id, name, slogan, description, category, default_price)
  FROM '/Users/kathyye/Desktop/hackreactor/SDC-PRODUCTS/ETL/transformed_data/product.csv'
  DELIMITER ',' CSV HEADER;

COPY features(id, product_id, name, value)
  FROM '/Users/kathyye/Desktop/hackreactor/SDC-PRODUCTS/ETL/transformed_data/features.csv'
  DELIMITER ',' CSV HEADER;

COPY styles(id, product_id, name, sale_price, original_price, is_default)
  FROM '/Users/kathyye/Desktop/hackreactor/SDC-PRODUCTS/ETL/transformed_data/styles.csv'
  DELIMITER ',' CSV HEADER;

COPY photos(id, style_id, url, thumbnail_url)
  FROM '/Users/kathyye/Desktop/hackreactor/SDC-PRODUCTS/ETL/transformed_data/photos.csv'
  DELIMITER ',' CSV HEADER;

COPY skus(id, quantity, size, style_id)
  FROM '/Users/kathyye/Desktop/hackreactor/SDC-PRODUCTS/ETL/transformed_data/skus.csv'
  DELIMITER ',' CSV HEADER;

COPY characteristics(id, product_id, name)
  FROM '/Users/kathyye/Desktop/hackreactor/SDC-PRODUCTS/ETL/transformed_data/characteristics.csv'
  DELIMITER ',' CSV HEADER;

COPY related(id, current_product_id, related_product_id)
  FROM '/Users/kathyye/Desktop/hackreactor/SDC-PRODUCTS/ETL/transformed_data/related.csv'
  DELIMITER ',' CSV HEADER;