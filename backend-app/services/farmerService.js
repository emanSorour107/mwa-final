const Farmer = require("../models/farmer");
const Product = require("../models/product");
const OrderService = require("./orderService");

let FarmerService = {
    getAll: (data, callback) => {
        Farmer.find({}, callback);
    }
    ,

    getProducts : async (farmerId) => {
        let query = {farmer: farmerId};
        console.log(111,query)
        let result = await Product.find(query);
        return {data:result};
    },

    getOrders : async (farmerId) => {
        return await OrderService.getByFarmer(farmerId);
    },

    create: (data, callback) => {
        Farmer.create(data, callback);
    },

    update: (data, callback) => {
        Farmer.update({_id: data._id}, data, callback);
    },

    remove: (id, callback) => {
        Farmer.findByIdAndRemove({_id: id}, callback);
    }
    
}
module.exports = FarmerService

