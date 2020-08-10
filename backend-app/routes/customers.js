const express = require('express');
const router = express.Router();
const Customer = require('../models/customer')
const bcrypt = require('bcrypt');
const CustomerService = require('../services/customerService');

router.get('/', (req, res) => {
  Customer.find({}, (err, customers) => {
    const results = customers.map((customer) => {
      customer.password = "hidden";
      return customer.toObject({ virtuals: true });
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

// Get order list of a farmer
router.get('/:id/orders', async function(req, res, next) {
  let customerId = req.params.id;

  let result = await CustomerService.getOrders(customerId);

  res.json(result);
  
});

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
