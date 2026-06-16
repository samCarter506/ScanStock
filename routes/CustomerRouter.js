const express = require('express')
const router = express.Router()
const Customer = require('../controllers/CustomerController')
const Auth = require('../middleware/JwtService')

router.get('/',Auth,Customer.GetCustomers)
      .get('/:id',Auth,Customer.getCustomer)
      .post('/',Auth,Customer.CreateCustomer)
      .put('/:id',Auth,Customer.UpdateCustomer)
      .delete('/:id',Auth,Customer.deleteCustomer)

module.exports = router