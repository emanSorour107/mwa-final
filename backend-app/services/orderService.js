const Product = require("../models/product");
const Order = require("../models/order");
const OrderMail = require("../utils/orderMail");

const DateUtil = require("../utils/date")

let getByQuery = async (query, callback) => {
    let result = await Order.find(query, callback).populate('products').populate('customer');
    return result;
};

let updateProductStock = async(productIds, stockAfter) =>{
    let saveQuery = [];
    productIds.forEach(id=>{
        saveQuery.push(Product.findByIdAndUpdate(id, {inStock: stockAfter[id]}))
        
    })

    return Promise.all(saveQuery)
    
    
    
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

    createOrder: async (customerId, farmerId, orderItems) => {

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
        let stockAfter = {}
        productItems.forEach((item)=>{
            console.log(9, item.inStock, item._id, itemsMap[item._id])

            if (item.inStock < itemsMap[item._id])
                shortageStock.push({_id: item._id, inStock: item.inStock})
            
            stockAfter[item._id] = item.inStock - itemsMap[item._id];
            item.inStock -= itemsMap[item._id];
        })

        console.log(99, shortageStock, itemsMap)

        if (shortageStock.length){
            // throw new Error()
            return ({error:"002", message:"Shortage of stock on", data: shortageStock.map(item=>item._id).join(', ')})
        }
        
        let totalAmount = productItems.map(p=>p.price* itemsMap[p._id]).reduce((sum=0, cur)=>{
            return sum + cur;
        })
        
       
        // create order
        let newOrderItems = []
        // create orderItems
        productItems.forEach((item)=>{
            console.log(999, item)
            let newItem = new Product({...item.toObject(), inStock: itemsMap[item._id]})
            newOrderItems.push(newItem)
        })

        const order = new Order({
            customer: customerId,
            farmer: farmerId,
            orderItems: newOrderItems,
            status: 'PENDING',
            totalAmount: totalAmount

        });

        result = await order.save();
        console.log('Create order', result)

        // update order stock
        let result2 = await updateProductStock(productIds, stockAfter);
        console.log('Stock updated', result2)
        

        let orderId = result._id;

        OrderMail.sendMailWhenCreateOrder(farmerId, customerId, orderId,  newOrderItems, totalAmount)
        
        return result;
    },

    update: (id, data, callback) => {
        if (!data.status) {
            console.log('Update without order status')
            Order.update({_id: id}, data, (cb)=>{
                console.log("Order updated", cb)
                callback(null, cb)
            })
        }else {
            console.log('Updating order status to' + data.status)
            OrderService.updateStatus(id, data.status, (result)=>{
                callback(null, result)
            })
        }
    },

    updateStatus: async (id, newStatus, callback)=> {
        let targetOrder = await Order.findById(id).populate('customer').exec()
        let currentStatus = targetOrder.status;
        console.log('Update order status', currentStatus)
        if (currentStatus==newStatus){
            callback({error:"NG", message: `Same status already ${currentStatus}`})
        }else{
            let updateData = {status: newStatus}

            if (newStatus=='READY'){
                updateData.pickUpTime = DateUtil.dateAfterDays(1)
            }
            
            let ret = await Order.update({_id: id}, updateData, (cb)=>{
                callback({result:"OK", message: `Has change from ${currentStatus} to ${newStatus}`})
            })
            
            console.log(`Updated order status from ${currentStatus} to ${newStatus}`)
            if (newStatus=='READY'){
                if (targetOrder.customer) {
                    let {totalAmount, orderItems, customer:{email:customerEmail}, _id: orderId} = targetOrder;
                    console.log(8888, 'order has change to ready', totalAmount, orderItems, customerEmail)
                    console.log("Sending mail to customer"+ customerEmail)
                    OrderMail.sendMailWhenOrderReady(customerEmail, {totalAmount, orderItems, pickUpTime: updateData.pickUpTime, orderId})
                }
                callback({result: "OK"})
            }
        }

    },

    rateOrder: async (id, rate) => {

    },

    remove: (id, callback) => {
        Order.findByIdAndRemove({_id: id}, callback);
    }

}

module.exports = OrderService
