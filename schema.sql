CREATE DATABASE products;

\c products;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price TEXT
);

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  name TEXT,
  value TEXT
);

CREATE TABLE products_features (
  product_id INTEGER REFERENCES products(id),
  feature_id INTEGER REFERENCES features(id),
  PRIMARY KEY (product_id, feature_id)
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
