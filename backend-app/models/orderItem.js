const {Schema, model} = require('mongoose')

const productSchema = Schema({
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    // itemAmount: Number,
    quantity: Number
})


const OrderItem = model('OrderItem', productSchema)
module.exports = OrderItem