const express = require('express')
const router = express.Router()
const Supplier = require('../controllers/SupplierController')
const Auth = require('../middleware/JwtService')

router.get('/',Auth,Supplier.GetSuppliers)
      .get('/:id',Auth,Supplier.GetSupplier)
      .post('/',Auth,Supplier.CreateSupplier)
      .put('/:id',Auth,Supplier.UpdateSupplier)
      .delete('/:id',Auth,Supplier.deleteSupplier)

module.exports = router