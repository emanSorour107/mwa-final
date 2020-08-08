const express = require('express');
const router = express.Router();
const Customer = require('../models/customer')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
  Customer.find({}, (err, customers) => {
    const results = customers.map((customer) => {
      return {
        name: customer.getFullName(),
        email: customer.email
      }
    })

    res.json(results)
  })
})

router.get('/:email', (req, res) => {
  const { email } = req.params
  Customer.find({ email }, (err, customers) => {
    const results = customers.map((customer) => {
      return {
        name: customer.getFullName(),
        email: customer.email
      }
    })

    res.json(results)
  })
})

router.get('/:email/orders', (req, res) => {
  const { email } = req.params
  const results = []
  res.json(results)
})

router.get('/:email/orders/:orderCode', (req, res) => {
  const { email, orderCode } = req.params
  const results = []
  res.json(results)
})

/**
 * NOTE: Only for testing purposes. Customer registration will be handled in usersRouter
 */
router.post('/', async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS))
  let newCustomer = await new Customer({ firstName, lastName, email, password: hashedPassword }).save()
  res.json({
    msg: 'New customer created',
    data: newCustomer
  })
})

module.exports = router;
