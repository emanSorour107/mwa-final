const Product = require("../models/product");
const Order = require("../models/order");


let OrderService = {
    createOrder: async (cutomerId, farmerId, productIds) => {
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

module.exports = OrderService
