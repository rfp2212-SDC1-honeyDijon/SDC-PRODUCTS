const Redis = require('redis');
const models = require('./models');

const redisClient = Redis.createClient();
// const DEFAULT_EXPIRATION = 3600;

redisClient.on('connect', () => console.log('Redis connected!'));
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

const getProducts = async (req, res) => {
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  try {
    const data = await redisClient.get(`products?count=${count}&page=${page}`);
    if (data === null) {
      const products = await models.getProducts(count, page);
      redisClient.set(`products?count=${count}&page=${page}`, JSON.stringify(products));
      return res.json(products);
    }
    res.json(JSON.parse(data));
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getProduct = async (req, res) => {
  const productId = req.params.productid;
  try {
    const product = await models.getProduct(productId);
    res.send(product);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getStyles = async (req, res) => {
  const productId = req.params.productid;
  try {
    const productStyles = await models.getStyles(productId);
    res.send(productStyles);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getRelated = async (req, res) => {
  const productId = req.params.productid;
  try {
    const related = await models.getRelated(productId);
    res.send(related);
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
