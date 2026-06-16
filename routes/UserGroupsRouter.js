var express = require('express');
var router = express.Router();
var Auth = require('../middleware/JwtService')

var userGrp=require('../controllers/UserGroupController')

router.get('/',Auth,userGrp.GetUserGroups)
    .put('/:id',Auth,userGrp.UpdateGroup)
    .get('/:id',Auth,userGrp.GetUserGroup)
    .post('/',Auth,userGrp.CreateUserGroup)
    .delete('/:id',Auth,userGrp.DeleteUserGroup)

module.exports=router