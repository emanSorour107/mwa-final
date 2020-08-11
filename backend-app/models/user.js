const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({

    email: String,
    password: String,
    uid: String,
    role: String // FARMER|CUSTOMER
})

customerSchema.virtual('fullName').get( function() {
    return `${this.firstName} ${this.lastName}`
});

const User = mongoose.model('User', customerSchema)
module.exports = User