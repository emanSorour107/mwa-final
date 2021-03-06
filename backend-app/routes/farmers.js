const express = require('express');
const FarmerService = require('../services/farmerService');
const router = express.Router();
const customerOnly = require('../middlewears/customerOnly')

router.get('/', customerOnly, function (req, res, next) {
  FarmerService.getAll({}, (err, result) => {
    res.json(result)
  })
});

// Get product list of a farmer
router.get('/:id/products', customerOnly, async function (req, res, next) {
  let farmerId = req.params.id;

  let result = await FarmerService.getProducts(farmerId);

  res.json(result);

});

// Get order list of a farmer
router.get('/:id/orders', customerOnly, async function (req, res, next) {
  let farmerId = req.params.id;

  let result = await FarmerService.getOrders(farmerId);

  res.json(result);

});

// Insert farmer
router.post('/', function (req, res, next) {
  FarmerService.create(req.body, (err, result) => {
    res.json(result);
  })
})

module.exports = router;
