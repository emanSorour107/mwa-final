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
Order.$ = {
    createOrder: async  (cutomerId, farmerId, productIds) => {
        const products = Product.find({_id: productIds})
        
        const order = new Order({
            cutomerId,
            farmerId,
            products,
            status: 'PENDING',
            totalAmount: products.reduce((sum=0, cur)=>{
                return sum + cur.price;
            })

        });

        const result = await order.save();
        console.log('Create order', result)
        return result;
    }
}
module.exports = Order