const jwt = require('jsonwebtoken')
const UserService = require('../services/userService')

module.exports = function (req, res, next) {
    // Validations
    const header = req.get('Authorization')
    try {
        const token = header && header.replace('Bearer ', '')
        if (token && jwt.verify(token, process.env.APP_SECRET)) {
            const payload = jwt.decode(token)
            if (payload.role == UserService.ROLES.CUSTOMER || payload.role == UserService.ROLES.FARMER) {
                next()
            }
        }
        res.status(401).json('Unable to access authorized resources')
    } catch (err) {
        res.status(401).json('Unable to access authorized resources')
    }
}