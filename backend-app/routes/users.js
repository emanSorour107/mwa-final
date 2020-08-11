const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');
const jwt = require('jsonwebtoken')

/**
 * Handle for customers, farmers, admin based on their specific role
 */
router.post('/login', (req, res) => {
    const { email, password } = req.body
    UserService.login(email, password, (userInfo) => {
        const token = jwt.sign(userInfo, process.env.APP_SECRET, { algorithm: process.env.APP_ALGO });
        res.setHeader(process.env.AUTHENTICATION_HEADER, `Bearer ${token}`)
        res.status(200).json("Signed in successfully")
    }, () => {
        res.status(401).json('Invalid email or password')
    })
})

router.post('/signup', async (req, res) => {
    UserService.register(req.body, (newUser) => {
        res.status(200).json("Signup successfully")
    })
})

module.exports = router