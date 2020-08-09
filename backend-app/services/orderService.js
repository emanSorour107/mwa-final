const Product = require("../models/product");
const Order = require("../models/order");

let getByQuery = async (query, callback) => {
    let result = await Order.find(query, callback).populate('products').populate('customer');
    return result;
};

let OrderService = {

    getById: (id, callback) => {
        Order.findOne({_id: id}, callback);
    },
  

    getByStatus: async (query, callback) => {
        // Order.find(query, callback);
        return await getByQuery(query);
    },

    getByQuery: getByQuery,

    getByFarmer : async (farmerId) => {
        return await getByQuery({farmer: farmerId});
    },

    getByCustomer : async (customerId) => {
        let query = {customer: customerId};
        return await getByQuery(query);
    },

    createOrder: async (cutomerId, farmerId, productIds) => {
        const products = await Product.find({_id: productIds});

        let totalAmount =products.map(p=>p.price).reduce((sum=0, cur)=>{
            return sum + cur.price;
        })

        
        const order = new Order({
            customer: cutomerId,
            farmer: farmerId,
            products,
            status: 'PENDING',
            totalAmount: totalAmount

        });

        const result = await order.save();
        console.log('Create order', result)
        return result;
    },

    update: (id, data, callback) => {
        Order.update({_id: id}, data, callback);
    },

    remove: (id, callback) => {
        Order.findByIdAndRemove({_id: id}, callback);
    }

}

module.exports = OrderService
