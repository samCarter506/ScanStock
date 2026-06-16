const mongoose = require("mongoose");

const ReceiptLineSchema = new mongoose.Schema({

    ReceiptId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sysReceipts",
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

    QuantityReceived: {
        type: Number,
        required: true
    },

    CostPrice: {
        type: Number,
        required: true
    },

    BatchNumber: {
        type: String,
        default: null
    },

    ExpiryDate: {
        type: Date,
        required: true
    }
},
{
    collection: "SysReceiptLines"
});

module.exports = mongoose.model(
    "SysReceiptLines",
    ReceiptLineSchema
);