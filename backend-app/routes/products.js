const express = require('express');
const ProductService = require('../services/productService');
const Product = require('../models/product');
const router = express.Router();
const multer = require('multer')
const {storage} = require('@google-cloud/storage')

const storageMulter = multer.diskStorage(
  {
      destination: 'assets/',
      filename: function ( req, file, cb ) {
        cb( null, file.originalname);
      }
    })
 const upload = multer( { storage: storageMulter } );

  

////====  
//Add product
router.post('/', upload.single('file'),async (req, res) => {
   photo = `C:/Labs/mwa-final/backend-app/assets/${req.file.originalname}`
    let newProduct = await new Product(req.body)
    newProduct.photo = photo
    newProduct.save()
  // let newProduct = await new Product(req.body).save()
  res.json({
    msg: 'New product created',
    data: newProduct
  })
});

//Add product image
// router.post('/file', upload.single('file'),async (req, res) => {
//   const file = req.file
//   res.send
// });

//Get all products
router.get('/', (req, res) => {
  Product.find({}, ((err, data) => res.json({
    data: data
  })))
})


//Get product by Id
router.get('/:id', async (req, res) => {
  const productId = req.params.id

  const product = await Product.findOne({
    _id: productId
  }, (err, data) => res.json({
    data: data
  }))
})

//Update product by id
router.put('/:id', async (req, res) => {
  const productId = req.params.id

  const product = await Product.findOne({
    _id: productId
  })
  product.name = req.body.name
  product.description = req.body.description
  product.price = req.body.price
  product.photo = req.body.photo
  product.inStock = req.body.inStock
  let result = await product.save()
  res.json({
    data: result,
    message: "Product updated Successful"
  })

});



// Delete a product
router.delete('/:id', async (req, res) => {
  const productId = req.params.id;

  var query = {
    _id: productId
  }
  const productCount = await Product.countDocuments(query)

  if (productCount == 1) {
    console.log(productCount)
    Product.deleteOne(query).then(function () {
      console.log("Data deleted");
      res.send({
        message: "Product is deleted"
      })
    }).catch(function (error) {
      console.log(error);
    });
  } else {
    res.status(400).json({
      error: 'Not existing: Product is already Deleted'

    })
  }


})



module.exports = router;