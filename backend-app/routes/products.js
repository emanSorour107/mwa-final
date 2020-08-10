const express = require('express');
const ProductService = require('../services/productService');
const router = express.Router();

router.get('/', function(req, res, next) {
  let query = {}
  ProductService.getAll({}, (err,result)=>{
    res.json(result)
  })
  
});

// Insert product
router.post('/', function(req, res, next) {
  ProductService.create(req.body, (err, result) => {
    res.json(result);
  })
})

module.exports = router;
