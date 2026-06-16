const Locations = require('../controllers/LocationController')
const Auth = require('../middleware/JwtService')
const express = require('express')
const router = express.Router()

router.get('/',Auth,Locations.GetLocations)
      .get('/:id',Auth,Locations.GetLocation)
      .post('/',Auth,Locations.CreateLocation)
      .put('/:id',Auth,Locations.UpdateLocation)
      .delete('/:id',Auth,Locations.DeleteLocation)

module.exports = router