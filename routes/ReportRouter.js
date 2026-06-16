const express = require("express");
const router = express.Router();
const reportController =require("../controllers/reportController");

router.get("/",reportController.GetReports)
        .get("/:id",reportController.GetReport)
        .post("/",reportController.CreateReport)
        .put("/:id",reportController.UpdateReport)
        .delete("/:id",reportController.DeleteReport);

module.exports = router;