const models = require('./models');

const getProducts = (req, res) => {
  const count = req.query.count || 5;
  const page = req.query.page || 1;

  models.getProducts(count, page)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => res.status(404).send(err));
};

const getProduct = (req, res) => {
  const productId = req.params.productid;

  models.getProduct(productId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => res.status(404).send(err));
};

const getStyles = (req, res) => {
  const productId = req.params.productid;

  models.getStyles(productId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => res.status(404).send(err));
};

const getRelated = (req, res) => {
  const productId = req.params.productid;

  models.getRelated(productId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => res.status(404).send(err));
};

module.exports = {
  getProducts,
  getProduct,
  getStyles,
  getRelated,
};
