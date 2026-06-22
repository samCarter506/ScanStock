const ReceiptLine = require("../controllers/ReceiptLineController");
const Auth = require("../middleware/JwtService");
const express = require("express");

const router = express.Router();

router.get("/", Auth, ReceiptLine.GetReceiptLines);

router.get(
    "/receipt/:receiptId",
    Auth,
    ReceiptLine.GetReceiptLinesByReceipt
);

router.get("/:id", Auth, ReceiptLine.GetReceiptLineById);

router.post("/", Auth, ReceiptLine.CreateReceiptLine);

router.put("/:id", Auth, ReceiptLine.UpdateReceiptLine);

router.delete("/:id", Auth, ReceiptLine.DeleteReceiptLine);

module.exports = router;