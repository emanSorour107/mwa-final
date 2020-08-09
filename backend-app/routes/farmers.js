const express = require('express');
const FarmerService = require('../services/farmerService');
const router = express.Router();


router.get('/', function(req, res, next) {
  let query = {}
  FarmerService.getAll({}, (err,result)=>{
    res.json(result)
  })
  
});

// Get product list of a farmer
router.get('/:id/products', async function(req, res, next) {
  let farmerId = req.params.id;

  let result = await FarmerService.getProducts(farmerId);

  res.json(result);
  
});

// Get order list of a farmer
router.get('/:id/orders', async function(req, res, next) {
  let farmerId = req.params.id;

  let result = await FarmerService.getOrders(farmerId);

  res.json(result);
  
});

// Insert farmer
router.post('/', function(req, res, next) {
  FarmerService.create(req.body, (err, result) => {
    res.json(result);
  })
})

module.exports = router;
