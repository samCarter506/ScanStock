const mongoose = require("mongoose");

const ReceiptSchema = new mongoose.Schema({
    ReceiptNumber: {
        type: String,
        required: true,
        unique: true
    },

    SupplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SysSuppliers",
        required: true
    },

    InvoiceNumber: {
        type: String,
        required: true
    },

    ReceivedDate: {
        type: Date,
        default: Date.now
    },

    Status: {
        type: String,
        enum: ["Pending", "Received", "Cancelled"],
        default: "Received"
    },

    Notes: {
        type: String,
        default: null
    },

    TotalItems: {
        type: Number,
        default: 0
    },

    LastUpdateUser: {
        type: String,
        default: null
    }
},
{
    collection: "sysReceipts"
});

module.exports = mongoose.model(
    "sysReceipts",
    ReceiptSchema
);