const express = require("express");
const router = express.Router();

const Auth = require("../middleware/JwtService");
const DashboardController = require(
  "../controllers/DashboardController"
);

router.get(
  "/",
  Auth,
  DashboardController.GetDashboardData
);

module.exports = router;