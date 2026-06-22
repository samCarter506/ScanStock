const express = require("express");
const router = express.Router();

const Auth = require("../middleware/JwtService");
const OutboundLine = require("../controllers/OutboundLineController");

router.get("/", Auth, OutboundLine.GetOutboundLines);

router.get(
    "/outbound/:id",
    Auth,
    OutboundLine.GetOutboundLinesByOutbound
);

router.get("/:id", Auth, OutboundLine.GetOutboundLine);

router.post("/", Auth, OutboundLine.CreateOutboundLine);

router.put("/:id", Auth, OutboundLine.UpdateOutboundLine);

router.delete("/:id", Auth, OutboundLine.DeleteOutboundLine);

module.exports = router;