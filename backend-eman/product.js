const express = require('express');
require('dotenv').config()
const Product = require('./productModel')

const {
    query
} = require('express');

const app = express();



// middlewares
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//Add product
app.post('/products/add', async (req, res) => {
    const { name, description, price, photo, inStock } = req.body
    let newProduct = await new Product({ name, description, price, photo, inStock }).save()
    res.json({
      msg: 'New product created',
      data: newProduct
    })
});

//Get all products
app.get('/products/all-products', (req, res) => {
    Product.find({} ,((err, data) => res.json({
        data: data
    })))
})


//Get product by Id
app.get('/products/:id', async (req, res) => {
    const productId = req.params.id

    const product = await Product.findOne({_id : productId}, (err, data) => res.json({
        data : data
    }))
})

//Update product by id
app.put('/products/update/:id', async (req, res) => {
    const productId = req.params.id

    const product = await Product.findOne({_id : productId})
     product.name = req.body.name
     product.description = req.body.description
     product.price = req.body.price
     product.photo = req.body.photo
     product.inStock = req.body.inStock
     await product.save()
     res.json({
         message : "Product updated Successful"
     })
    
}); 
      
    

// Delete a product
app.delete('/products/delete/:id', async (req, res) => {
    const productId = req.params.id;

    var query = {
        _id: productId
    }
    const productCount =  await Product.countDocuments(query)

    if(productCount  == 1){
    console.log(productCount)
       Product.deleteOne(query).then(function(){ 
        console.log("Data deleted");  
        res.send({message : "Product is deleted"})
    }).catch(function(error){ 
        console.log(error);  
    }); 
     }
     else{
         res.status(400).json({
            error: 'Not existing: Product is already Deleted'

         })
     }
    
    
})





app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

app.listen(3001, () => console.log('listening to 3001'));