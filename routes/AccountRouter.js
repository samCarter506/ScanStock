const Auth = require('../middleware/JwtService')
const Account = require('../controllers/AccountController')
const express = require('express')
const router = express.Router();

router.post('/login',Account.Login)
      .post('/logout',Auth,Account.Logout)

module.exports = router;