const express = require('express');
const {
    MongoClient
} = require('mongodb');
const {
    query
} = require('express');
const uri = "mongodb+srv://eman:eman123@cluster0.0jbff.mongodb.net/test?retryWrites=true&w=majority&useUnifiedTopology=true";
const client = new MongoClient(uri);

let db;
const app = express();


// middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use((req, res, next) => {
    if (!db) {
        client.connect(function (err) {
            db = client.db('project');
            req.db = db.collection('products');
            next();
        });
    } else {
        req.db = db.collection('products');
        next();
    }
})


//Add product
app.post('/products/add', async (req, res) => {
    await req.db.insertOne(req.body, (err, results) => res.json({
        message: "product added",
        data: req.body,
    }))
});

//Get all products
app.get('/products/all-products', (req, res) => {
    req.db.find({}).toArray((err, data) => res.json({
        data: data
    }))
})

//Update product by id
app.put('/products/update/:id', async (req, res) => {
    const productId = req.params.id

    var query = {
        _id: productId
    }
    req.db.updateOne(query, {
        $set: {
            "name": req.body.name,
            "description": req.body.description
        }
    })
    res.json({
        message: "Product updated",
        data: req.body
    });

})

// Delete a product
app.delete('/products/delete/:id', async (req, res) => {
    const productId = req.params.id;

    var query = {
        _id: productId
    }
    const productCount =  await req.db.countDocuments(query)

    if(productCount  == 1){
       req.db.deleteOne(query);
       res.status(200).json({
        message: 'Product Deleted'
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