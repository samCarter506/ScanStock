const express = require("express");
const Auth = require('../middleware/JwtService')
const router = express.Router();

const userController = require(
  "../controllers/UsersController"
);

router.get(
  "/",Auth,
  userController.getUsers
);

router.get(
  "/:id",Auth,
  userController.getUserById
);

router.post(
  "/",Auth,
  userController.createUser
);

router.put(
  "/:id",Auth,
  userController.updateUser
);

router.delete(
  "/:id",Auth,
  userController.deleteUser
);

module.exports = router;