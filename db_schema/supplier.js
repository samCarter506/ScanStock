const mongoose = require('mongoose')

const SupplierSchema = new mongoose.Schema({
     SupplierCode: {
        type: String,
        required: true,
        unique: true
    },
    SupplierName :{
        type : String,
        required :true
    },

    ContactPerson: {
        type: String,
        required: true
    },

    EmailAddrss: {
        type: String,
        required: true
    },
    Cellphone :{
        type: String,
        required:true
    },
   
    Province: {
        type: String,
        required: true
    },

    PostalCode: {
        type: String,
        required: true
    },
    City:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
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
    collection: "SysSuppliers"
});

module.exports = mongoose.model(
    "SysSuppliers",
    SupplierSchema
);