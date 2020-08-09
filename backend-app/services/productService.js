const Product = require("../models/product");

let ProductService =  {
    getAll : async (query, callback) => {
        Product.find(query, callback);
        
    },

    create: (data, callback) => {
        Product.create(data, callback);
    },

    update: (data, callback) => {
        Product.replaceOne({_id:data._id}, data, callback);
    },

    remove: (id, callback) => {
        Product.findByIdAndRemove({_id: id}, callback);
    }
}

module.exports = ProductService

