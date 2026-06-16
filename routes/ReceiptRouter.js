const Receipt = require('../controllers/ReceiptController')
const Auth = require('../middleware/JwtService')
const express = require('express')
const router = express.Router()

router.get('/',Auth,Receipt.GetReceipts)
      .get('/:id',Auth,Receipt.GetReceipt)
      .post('/',Auth,Receipt.CreateReceipt)
      .put('/:id',Auth,Receipt.UpdateReceipt)
      .delete('/:id',Auth,Receipt.deleteReceipt)

module.exports = router