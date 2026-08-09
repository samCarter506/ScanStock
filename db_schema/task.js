const mongoose = require("mongoose");
const moment = require("moment");

const TaskSchema = new mongoose.Schema(
{
    TaskNumber: {
        type: String,
        required: true,
        unique: true
    },

    TaskType: {
        type: String,
        enum: [
            "Picking",
            "Receiving",
            "PutAway",
            "CycleCount",
            "Transfer"
        ],
        required: true
    },

    // Reference document (Outbound, Receipt, etc.)
    ReferenceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    ReferenceType: {
        type: String,
        enum: [
            "Outbound",
            "Receipt",
            "Transfer",
            "CycleCount"
        ],
        required: true
    },

    AssignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SysUsers",
        required: true
    },

    AssignedBy: {
        type: String,
        required: true
    },

    Priority: {
        type: String,
        enum: [
            "Low",
            "Medium",
            "High",
            "Urgent"
        ],
        default: "Medium"
    },

    Status: {
        type: String,
        enum: [
            "Pending",
            "In Progress",
            "Completed",
            "Cancelled"
        ],
        default: "Pending"
    },

    AssignedDate: {
        type: String,
        default: () =>
            moment().format("YYYY-MM-DD HH:mm:ss")
    },

    StartDate: {
        type: String,
        default: null
    },

    CompletedDate: {
        type: String,
        default: null
    },

    LastUpdate: {
        type: String,
        default: () =>
            moment().format("YYYY-MM-DD HH:mm:ss")
    },

    Notes: {
        type: String,
        default: ""
    }
},
{
    collection: "Task"
});

module.exports = mongoose.model(
    "Task",
    TaskSchema
);