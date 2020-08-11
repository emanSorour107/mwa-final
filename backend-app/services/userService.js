const User = require('../models/user')
const bcrypt = require('bcrypt')
const Farmer = require('../models/farmer')
const Customer = require('../models/customer')
const USER_ROLES = {
    CUSTOMER: 'CUSTOMER',
    FARMER: 'FARMER'
}

const UserService = {
    register: async (body, callback) => {
        const { firstName, lastName, email, password, isFarmer, tel, address } = body
        const role = isFarmer ? USER_ROLES.FARMER : USER_ROLES.CUSTOMER
        let newUserInfo
        if (role == USER_ROLES.FARMER) {
            newUserInfo = await new Farmer({ firstName, lastName, email, reputation: 0, tel, address }).save()
        } else {
            newUserInfo = await new Customer({ firstName, lastName, email }).save()
        }
        const newUser = await new User({ firstName, lastName, email, password, role, uid: newUserInfo._id}).save()
        callback(newUser)
    },

    login: async (email, password, successCB, errorCB) => {
        const user = await User.findOne({ email })
        if (user) {
            const isValid = bcrypt.compareSync(password, user.password)
            if (!isValid) {
                errorCB()
            } else {
                successCB({ email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role, uid: user.uid })
            }

        }
    }
}

UserService.ROLES = USER_ROLES

module.exports = UserService