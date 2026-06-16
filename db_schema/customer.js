const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    CustomerCode: {
        type: String,
        required: true,
        unique: true
    },
    CustomerName: {
        type: String,
        required: true
    },

    ContactPerson: {
        type: String,
        required: true
    },

    EmailAddrss: {
        type: String,
        required: true
    },
    Cellphone: {
        type: String,
        required: true
    },

    Province: {
        type: String,
        required: true
    },

    PostalCode: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    IsActive: {
        type: Boolean,
        default: true
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
    },
    CustomerType: {
        type: String,
        enum: ["Cash", "Credit"],
        default: "Cash"
    },

    CreditLimit: {
        type: Number,
        default: 0
    },

    TaxNumber: {
        type: String,
        default: null
    },

    Balance: {
        type: Number,
        default: 0
    }
},
    {
        collection: "SysCustomers"
    });

module.exports = mongoose.model(
    "SysCustomers",
    CustomerSchema
);