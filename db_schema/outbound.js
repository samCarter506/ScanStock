const mongoose = require("mongoose");

const outboundSchema = new mongoose.Schema(
{
    OutboundNumber: {
        type: String,
        required: true,
        unique: true
    },

    CustomerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SysCustomers",
        required: true
    },

    ReferenceNumber: {
        type: String,
        default: null
    },

    Notes: {
        type: String,
        default: null
    },

    TotalItems: {
        type: Number,
        default: 0
    },

    Status: {
        type: String,
        enum: [
            "Open",
            "Completed",
            "Cancelled"
        ],
        default: "Open"
    },

    CreateDate: {
        type: Date,
        default: Date.now
    },

    LastUpdate: {
        type: Date,
        default: Date.now
    },

    LastUpdateUser: {
        type: String,
        default: null
    }
},
{
    collection: "Outbound"
});

module.exports = mongoose.model(
    "Outbound",
    outboundSchema
);