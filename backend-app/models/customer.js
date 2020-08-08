const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    firstName: String, 
    lastName: String,
    email: String,
    password: String
})

customerSchema.methods.getFullName = function() {
    return `${this.firstName} ${this.lastName}`
}

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer