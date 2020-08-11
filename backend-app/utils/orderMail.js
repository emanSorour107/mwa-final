require('dotenv').config();
const Mail = require("../utils/mail");
const Farmer = require("../models/farmer");
const Customer = require('../models/customer');
const DateUtils = require('./date');


const OrderMail = {
    sendMailWhenCreateOrder : async (farmerId, customerId, orderId, purchaseList, totalAmount) => {
        let farmer = await Farmer.findById(farmerId).select({email:1}).exec()
        
        let customer = await Customer.findById(customerId).select({email:1}).exec()

        console.log('Debug email', farmerId, customerId, farmer.email, customer.email)

        console.log(111, typeof purchaseList, purchaseList)

        const BR = "\r\n";
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
    },

    sendMailWhenOrderReady: async (customerEmail, data) => {
        console.log('Sending email to customer', customerEmail, data)
        // order has ready to pickup
        let {totalAmount, orderItems, pickUpTime, orderId} = data;
        // let customer = await Farmer.findById(customerId).select({email:1}).exec()
        // let customerEmail = customer.email;
        if (customerEmail){
            
            const BR = "\r\n";
            let productListText = orderItems.map(p=>{
                return `\t\t${p.name}: \t\t ${p.inStock}`
            }).join (BR)

            let formattedDate = DateUtils.formatDate(pickUpTime);

            let orderDetail = ` ${productListText} \r\nTotal: \t\t ${totalAmount}`
            let text = `Your order has ready to pick up at: ${formattedDate}\r\nOn: ${process.env.FRONTEND_URL}/customer/orders/${orderId} ${BR}${orderDetail}`
            mailData = {
                to: customerEmail,
                subject: 'Your order is ready to pick up',
                text: text
            }
            Mail.sendMail(mailData, (result)=>{
                console.log("Customer Send mail inform ready to pickup OK")
            })

    
        }

    }
}

module.exports = OrderMail