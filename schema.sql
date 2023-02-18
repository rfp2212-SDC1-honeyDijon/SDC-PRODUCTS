DROP DATABASE IF EXISTS products;
CREATE DATABASE products;

\c products;

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50),
  slogan VARCHAR(500),
  description VARCHAR(500),
  category VARCHAR(50),
  default_price VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS features (
  id INTEGER PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  name VARCHAR(20),
  value VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS styles (
  id INTEGER PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  name VARCHAR(20),
  sale_price VARCHAR(20),
  original_price VARCHAR(20),
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

CREATE INDEX products_idx ON products(id, name, slogan, description, category, default_price);

COPY products(id, name, slogan, description, category, default_price)
  FROM '/Users/kathyye/Desktop/hackreactor/SDC-PRODUCTS/ETL/transformed_data/product.csv'
  DELIMITER ',' CSV HEADER;

