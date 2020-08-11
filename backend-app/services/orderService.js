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

    createOrder: async (cutomerId, farmerId, orderItems) => {

        let productIds = orderItems.map(item => item._id);
        let itemsMap = Object.fromEntries(orderItems.map(item=>[item._id, item.quantity]));

        const productItems = await Product.find().where('_id').in(productIds).exec()
        //  ({_id: productIds});

        let productItemIds = productItems.map(item=>item._id.toString());
        
        console.log(99999, productItems.length , orderItems.length, productItemIds, orderItems, orderItems.filter(item=> productItemIds.indexOf(item._id)>-1))
        // return null;
        if (productItems.length < orderItems.length)
            return ({error: "001", message: "Product not exists", data: orderItems.filter(item => !productItemIds.includes(item._id)) })

        //check stock
        let shortageStock = []
        productItems.forEach((item)=>{
            console.log(9, item.inStock, item._id, itemsMap[item._id])
            if (item.inStock < itemsMap[item._id])
                shortageStock.push({_id: item._id, inStock: item.inStock})
        })

        console.log(99, shortageStock, itemsMap)

        if (shortageStock.length){
            // throw new Error()
            return ({error:"002", message:"Shortage of stock on", data: shortageStock.map(item=>item._id).join(', ')})
        }
        
        let totalAmount = productItems.map(p=>p.price* itemsMap[p._id]).reduce((sum=0, cur)=>{
            return sum + cur;
        })

        let newOrderItems = []
        // create orderItems
        productItems.forEach((item)=>{
            console.log(999, item)
            let newItem = new Product({...item.toObject(), inStock: itemsMap[item._id]})
            newOrderItems.push(newItem)
        })
        
        const order = new Order({
            customer: cutomerId,
            farmer: farmerId,
            orderItems: newOrderItems,
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
