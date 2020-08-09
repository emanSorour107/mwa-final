const Product = require("../models/product");

let ProductService =  {
    findAll : async (query, callback) => {
        Product.find(query, callback);
        
    }
}

module.exports = ProductService

