CREATE DATABASE products;

\c products;

CREATE TABLE products (
  id PRIMARY KEY,
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
  id PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  name TEXT,
  value TEXT
);

CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  name TEXT,
  original_price TEXT,
  sale_price TEXT,
  is_default BOOLEAN,
  product_id INTEGER REFERENCES products(id)
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  thumbnail_url TEXT,
  url TEXT,
  style_id INTEGER REFERENCES styles(id)
);

CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  quantity INTEGER,
  size TEXT,
  style_id INTEGER REFERENCES styles(id)
);
