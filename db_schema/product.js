const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    Barcode:{
        type : String,
        required: true,
        unique: true
    },
    ProductName:{
        type :String,
        required:true,
        unique:true
    },
    Description:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    MinimumStock:{
        type: Number,
        required: true
    },
    CostPrice:{
        type: Number,
        required:true
    },
    SellingPrice:{
        type: Number,
        required:true
    },
    ArrivalDate: {
        type: Date,
        default: Date.now
    },
    ExpiryDate: {
        type: Date,
        required: true
    },
    CategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sysProductCategory"
    },
    Locations: [
        {
            LocationId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SysLocations",
                required: true
            },

            Quantity: {
                type: Number,
                required: true,
                default: 0
            },

            MinimumStock: {
                type: Number,
                default: 0
            }
        }
    ]

},{collection:"sysProducts"}
)
const Product = mongoose.model(
    "sysProducts",
    productSchema
)
module.exports = Product;