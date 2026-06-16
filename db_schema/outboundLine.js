const mongoose = require("mongoose");

const outboundLineSchema = new mongoose.Schema(
{
    OutboundId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OutboundHeaders",
        required: true
    },

    ProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sysProducts",
        required: true
    },

    LocationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SysLocations",
        required: true
    },

    QuantityIssued: {
        type: Number,
        required: true
    },

    SellingPrice: {
        type: Number,
        required: true
    },

    BatchNumber: {
        type: String,
        default: null
    },

    IssueDate: {
        type: Date,
        default: Date.now
    }
},
{
    collection: "OutboundLines"
});

module.exports = mongoose.model(
    "OutboundLines",
    outboundLineSchema
);