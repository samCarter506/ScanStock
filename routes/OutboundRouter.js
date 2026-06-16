const express = require('express')
const router = express.Router()
const Outbound = require('../controllers/OutboundController')
const Auth = require('../middleware/JwtService')
const outbound = require('../db_schema/outbound')

router.get('/',Auth,Outbound.GetOutbounds)
      .get('/:id',Auth,Outbound.GetOutbound)
      .post('/',Auth,Outbound.CreateOutbound)
      .put('/:id',Auth,Outbound.UpdateOutbound)
      .delete('/:id',Auth,Outbound.deleteOutbound)

module.exports = router