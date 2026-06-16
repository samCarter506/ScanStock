const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
{
    ReportNumber: {
        type: String,
        required: true,
        unique: true
    },

    ReportType: {
        type: String,
        enum: [
            "StockOnHand",
            "StockMovement",
            "GoodsReceived",
            "Sales",
            "LowStock",
            "Expiry",
            "Supplier",
            "Customer"
        ],
        required: true
    },

    FromDate: {
        type: Date,
        required: true
    },

    ToDate: {
        type: Date,
        required: true
    },

    GeneratedBy: {
        type: String,
        required: true
    },

    TotalRecords: {
        type: Number,
        default: 0
    },

    Status: {
        type: String,
        enum: [
            "Pending",
            "Completed",
            "Failed"
        ],
        default: "Completed"
    },

    FileName: {
        type: String,
        default: null
    },

    FilePath: {
        type: String,
        default: null
    },

    Notes: {
        type: String,
        default: null
    },

    CreateDate: {
        type: Date,
        default: Date.now
    }
},
{
    collection: "SysReports"
});

module.exports = mongoose.model(
    "SysReports",
    reportSchema
);