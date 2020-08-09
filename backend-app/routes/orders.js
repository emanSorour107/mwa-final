const express = require('express');
const router = express.Router();
const Order = require('../models/order')

router.get('/:orderCode', function (req, res, next) {
  const { orderCode } = req.params
  Order.find({ orderCode }, (err, orders) => {
    res.json(orders)
  })
});


router.get('/:status', function (req, res, next) {
  const { status='*' } = req.params
  const query = status=='*'?{}:{status};
  Order.find({ query }, (err, orders) => {
    res.json(orders)
  })
});


router.post('/', function(req, res, next) {
  const { customerId, farmerId, productIds} = body;
  Order.$$.createOrder(customerId, farmerId, productIds).then(
    (result) => res.json(result)
  );
  

});

router.put('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

router.delete('/:id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
