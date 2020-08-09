const express = require('express');
const ProductService = require('../services/productService');
const router = express.Router();

router.get('/', function(req, res, next) {
  let query = {}
  ProductService.findAll({}, (err,result)=>{
    res.json(result)
  })
  
});

module.exports = router;
