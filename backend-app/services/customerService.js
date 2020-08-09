const Customer = require("../models/customer");
const OrderService = require("./orderService");

let CustomerService = {
    findAll : (query) => {
        Customer.find(query, (err, res) => res);
    },


    getOrders : async (customerId) => {
        return await OrderService.getByCustomer(customerId);
    },

}

module.exports = CustomerService

