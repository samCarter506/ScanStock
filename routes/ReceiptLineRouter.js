const ReceiptLine = require('../controllers/ReceiptLineController')
const Auth = require('../middleware/JwtService')
const express = require('express')
const router = express.Router()

router.get('/',Auth,ReceiptLine.GetReceiptLines)
      .get('/:id',Auth,ReceiptLine.GetReceiptLine)
      .post('/',Auth,ReceiptLine.CreateReceiptLine)
      .put('/:id',Auth,ReceiptLine.UpdateReceiptLine)
      .delete('/:id',Auth,ReceiptLine.DeleteReceiptLine)

module.exports = router