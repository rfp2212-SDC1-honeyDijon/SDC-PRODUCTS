const Redis = require('redis');
const models = require('./models');

const redisClient = Redis.createClient();

redisClient.on('connect', () => console.log('Redis connected!'));
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

const getProducts = async (req, res) => {
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  try {
    const cached = await redisClient.get(`products?count=${count}&page=${page}`);
    if (!cached) {
      const products = await models.getProducts(count, page);
      redisClient.set(`products?count=${count}&page=${page}`, JSON.stringify(products));
      res.send(products);
      return;
    }
    res.send(JSON.parse(cached));
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getProduct = async (req, res) => {
  const productId = req.params.productid;
  try {
    const cached = await redisClient.get(`products:${productId}`);
    if (!cached) {
      const product = await models.getProduct(productId);
      redisClient.set(`products:${productId}`, JSON.stringify(product));
      res.send(product);
      return;
    }
    res.send(JSON.parse(cached));
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getStyles = async (req, res) => {
  const productId = req.params.productid;
  try {
    const cached = await redisClient.get(`products:${productId}/styles`);
    if (!cached) {
      const productStyles = await models.getStyles(productId);
      redisClient.set(`products:${productId}/styles`, JSON.stringify(productStyles));
      res.send(productStyles);
      return;
    }
    res.send(JSON.parse(cached));
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getRelated = async (req, res) => {
  const productId = req.params.productid;
  try {
    const cached = await redisClient.get(`products:${productId}/related`);
    if (!cached) {
      const related = await models.getRelated(productId);
      redisClient.set(`products:${productId}/related`, JSON.stringify(related));
      res.send(related);
      return;
    }
    res.send(JSON.parse(cached));
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = {
  getProducts,
  getProduct,
  getStyles,
  getRelated,
};
