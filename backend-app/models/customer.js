const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: String, 
    lastName: String,
    email: String,
    password: String
})

userSchema.virtual('fullName').get( function() {
    return `${this.firstName} ${this.lastName}`
});

const User = mongoose.model('User', userSchema)
module.exports = User