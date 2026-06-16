const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
{
    LocationCode: {
        type: String,
        required: true,
        unique: true
    },

    LocationName: {
        type: String,
        required: true
    },

    Description: {
        type: String,
        default: null
    },

    Warehouse: {
        type: String,
        required: true
    },

    Aisle: {
        type: String,
        default: null
    },
    MinimumStock:{
        type:Number  
    },
    Quantity:{
        type:Number
    },
    Shelf: {
        type: String,
        default: null
    },

    Bin: {
        type: String,
        default: null
    },
    CheckDigit:{
        type:Number,
        required :true
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
    }
},
{
    collection: "SysLocations"
});

const Location = mongoose.model(
    "SysLocations",
    locationSchema
);

module.exports = Location;