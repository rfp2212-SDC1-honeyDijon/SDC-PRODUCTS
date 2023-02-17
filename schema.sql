CREATE DATABASE products;

\c products;

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  campus TEXT,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price TEXT,
  created_at TEXT,
  updated_at TEXT
);

CREATE TABLE features (
  id INTEGER PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  name TEXT,
  value TEXT
);

CREATE TABLE styles (
  id INTEGER PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  name TEXT,
  sale_price TEXT,
  original_price TEXT,
  is_default BOOLEAN
);

CREATE TABLE photos (
  id INTEGER PRIMARY KEY,
  style_id INTEGER REFERENCES styles(id),
  url TEXT,
  thumbnail_url TEXT
);

CREATE TABLE skus (
  id INTEGER PRIMARY KEY,
  quantity INTEGER,
  size TEXT,
  style_id INTEGER REFERENCES styles(id)
);

CREATE INDEX products_idx ON products(id, campus, name, slogan, description, category, default_price, created_at, updated_at);

COPY products(id, campus, name, slogan, description, category, default_price, created_at, updated_at)
  FROM '/Users/kathyye/Desktop/hackreactor/SDC-PRODUCTS/ETL/transformed_data/product.csv'
  DELIMITER ',' CSV HEADER;

