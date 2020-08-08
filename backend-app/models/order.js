const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    orderCode: String,
    date: Date,
    status: String
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order