const mongoose = require('mongoose')

const farmerSchema = mongoose.Schema({
    firstName: String, 
    lastName: String,
    email: String,
    password: String
})

farmerSchema.methods.getFullName = function() {
    return `${this.firstName} ${this.lastName}`
}

const Farmer = mongoose.model('Farmer', farmerSchema)
module.exports = Farmer