const OutboundLine = require('../controllers/OutboundLineController')
const Auth = require('../middleware/JwtService')
const express = require('express')
const router = express.Router()

router.get('/',Auth,OutboundLine.GetOutboundLines)
      .get('/:id',Auth,OutboundLine.GetOutboundLine)
      .post('/',Auth,OutboundLine.CreateOutboundLine)
      .put('/:id',Auth,OutboundLine.UpdateOutboundLine)
      .delete('/:id',Auth,OutboundLine.DeleteOutboundLine)

module.exports = router