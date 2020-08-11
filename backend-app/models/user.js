const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'First name cannot be empty'
    },
    lastName: {
        type: String,
        required: 'Last name cannot be empty'
    },
    email: {
        type: String,
        required: 'Email cannot be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password cannot be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    role: {
        type: String,
        required: 'Role cannot be empty'
    },
    uid: {
        type: String
    }
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const hashedPassword = await bcrypt.hash(this.password, parseInt(process.env.BCRYPT_ROUNDS))
    this.password = hashedPassword
    next()
});

const User = mongoose.model('User', userSchema);
module.exports = User