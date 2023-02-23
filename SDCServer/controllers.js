const models = require('./models');

const getProducts = async (req, res) => {
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  try {
    const products = await models.getProducts(count, page);
    res.send(products);
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
