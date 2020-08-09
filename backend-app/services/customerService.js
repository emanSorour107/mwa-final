const Customer = require("../models/customer")

let OrderService = {
    findAll : (query) => {
        Customer.find(query, (err, res) => res);
    }
}

module.exports = OrderService

