const express = require('express');
const router = express.Router();
const Order = require('../models/order')

router.get('/:orderCode', function (req, res, next) {
  const { orderCode } = req.params
  Order.find({ orderCode }, (err, orders) => {
    res.json(orders)
  })
});

module.exports = router;
