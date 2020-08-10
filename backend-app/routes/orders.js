const express = require('express');
const router = express.Router();
const OrderService = require('../services/orderService');

router.get('/:id', function (req, res, next) {
  const { id } = req.params
  OrderService.getById(id, (err, orders) => {
    res.json(orders)
  })
});


router.get('/', function (req, res, next) {
  const query = req.query;
  OrderService.getByQuery(query, (err, orders) => {
    res.json(orders)
  })
});

// Create new order when check out
router.post('/', async function(req, res, next) {
  const { customerId, address, products} = req.body;

  let result = await OrderService.createOrder(customerId, address, products);
  res.json(result);

});

router.put('/:id', function(req, res, next) {
  let data = req.query;
  let {id} = req.params;

  OrderService.update(id, data, (err, result)=>{
    if (err)
      next(err);

    res.json(result);
  })
  
});

router.delete('/:id', function(req, res, next) {
  let id = req.params.id;
  OrderService.remove(id, ()=>{})
  
});

module.exports = router;
