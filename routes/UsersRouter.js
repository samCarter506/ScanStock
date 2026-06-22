const express = require("express");
const Auth = require("../middleware/JwtService");
const router = express.Router();

const userController = require(
  "../controllers/UsersController"
);

/* Profile routes must come before /:id */

router.get(
  "/profile/me",
  Auth,
  userController.getMyProfile
);

router.put(
  "/profile/me",
  Auth,
  userController.updateMyProfile
);

router.put(
  "/profile/change-password",
  Auth,
  userController.changeMyPassword
);

/* Normal user management routes */

router.get("/", Auth, userController.getUsers);

router.get("/:id", Auth, userController.getUserById);

router.post("/", Auth, userController.createUser);

router.put("/:id", Auth, userController.updateUser);

router.delete("/:id", Auth, userController.deleteUser);

module.exports = router;