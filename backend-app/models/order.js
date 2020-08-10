const {Schema, model} = require('mongoose')

const Product = require('./product')

const orderSchema = Schema({
    customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
    farmer: {type: Schema.Types.ObjectId, ref: 'Farmer'},
    // orderCode: String,
    createDate: { type: Date, default: Date.now },
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    status: String, //(PENDING || READY || COMPLETE)
    totalAmount: Number,
    pickUpTime: Date,
    rate: String//(null||EXCELLENT||GOOD||BAD)
})

const Order = model('Order', orderSchema)

module.exports = Order