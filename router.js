const express = require('express');

const router = express.Router();
const controllers = require('./controllers');

router.get('/', (req, res) => {
  controllers.getProducts(req, res);
});

router.get('/:productid', (req, res) => {
  controllers.getProduct(req, res);
});

router.get('/:productid/styles', (req, res) => {
  controllers.getStyles(req, res);
});

router.get('/:productid/related', (req, res) => {
  controllers.getRelated(req, res);
});

module.exports = router;
