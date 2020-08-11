require('dotenv').config();

const Product = require("../models/product");
const Order = require("../models/order");
const Mail = require("../utils/mail");
const Farmer = require("../models/farmer");
const Customer = require('../models/customer');

let getByQuery = async (query, callback) => {
    let result = await Order.find(query, callback).populate('products').populate('customer');
    return result;
};

let updateProductStock = async (productToUpdate, stockAfter) =>{

};

let sendMailWhenCreateOrder = async (farmerId, customerId, orderId, purchaseList, totalAmount) => {
    let farmer = await Farmer.findById(farmerId).select({email:1}).exec()
    
    let customer = await Customer.findById(customerId).select({email:1}).exec()

    console.log('Debug email', farmerId, customerId, farmer.email, customer.email)
    // return
    
    const BR = "\r\n";

    console.log(111, typeof purchaseList, purchaseList)
    let productListText = purchaseList.map(p=>{
        return `\t\t${p.name}: \t\t ${p.inStock}`
    }).join (BR)
    
    let orderDetail = ` ${productListText} \r\nTotal: \t\t ${totalAmount}`

    let farmerEmail = farmer.email
    // for Farmer
    if (!farmerEmail){
        console.log('Missing email farmer', farmerId, farmerEmail)
    }else{
        
        let text = `You have new order: ${process.env.FRONTEND_URL}/farmers/orders/${orderId} ${BR}${orderDetail}`
        let mailData = {
            to: farmerEmail,
            subject: 'Have a new order',
            text: text
        }
        Mail.sendMail(mailData, (result)=>{
            console.log("Farmer Send mail OK")
        })
    }
    // to customer
    let customerEmail = customer.email
    if (!customerEmail ){
        console.log('Missing email', customerId, customerEmail)
    }else{
        text = `Your new order: ${process.env.FRONTEND_URL}/customer/orders/${orderId} ${BR}${orderDetail}`
        mailData = {
            to: customerEmail,
            subject: 'You have just created an order',
            text: text
        }
        Mail.sendMail(mailData, (result)=>{
            console.log("Customer Send mail OK")
        })
    }
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
        })

        console.log(99, shortageStock, itemsMap)

        if (shortageStock.length){
            // throw new Error()
            return ({error:"002", message:"Shortage of stock on", data: shortageStock.map(item=>item._id).join(', ')})
        }
        
        let totalAmount = productItems.map(p=>p.price* itemsMap[p._id]).reduce((sum=0, cur)=>{
            return sum + cur;
        })
        

        // update order stock
        let result = await updateProductStock(productItems, stockAfter);

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
        let orderId = result._id;
        sendMailWhenCreateOrder(farmerId, customerId, orderId,  newOrderItems, totalAmount)
        
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
