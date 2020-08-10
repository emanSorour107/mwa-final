const {Schema, model} = require('mongoose')

const productSchema = Schema({
    name: String,
    farmer: {type: Schema.Types.ObjectId, ref: 'Farmer'},
    name: String,
    description: String,
    price: Number,
    photoUrl: String,
    inStock: Number
})

const Product = model('Product', productSchema)
module.exports = Product