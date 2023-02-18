const express = require('express');

const router = express.Router();
const controllers = require('./controllers');

router.get('/', (req, res) => {
  controllers.getProducts(req, res);
});

router.get('/:productid', (req, res) => {
  controllers.getProduct(req, res);
});

module.exports = router;

// router.get('/:productid/styles', (req, res) => {
//   controllers
//     .getAll(`products/${req.params.productid}/styles`)
//     .then((data) => {
//       res.send(data.data);
//     })
//     .catch((err) => new Error(err));
// });

// router.get('/:productid/related', (req, res) => {
//   controllers
//     .getAll(`products/${req.params.productid}/related`)
//     .then((data) => {
//       res.send(data.data);
//     })
//     .catch((err) => new Error(err));
// });
