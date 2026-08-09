const mongoose = require('mongoose')

const BatchPickSchema = new mongoose.Schema({
    Batch :{
        type:mongoose.Types.ObjectId,
        ref:"Batch",
        required:true
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref :"sysProducts",
        required:true
    },
    location:{
        type:mongoose.Types.ObjectId,
        ref:"SysLocations",
        required:true
    },
    quantityToPick:Number,
    pickedQuantity:{
        type:Number,
        default:0
    },
    sequence:Number,
    status:{
        type:String,
        enum : ["Waiting","Picking","Picked"],
        default: "Waiting"
    }


},{
    timestamps:true
});

module.exports = mongoose.model(
    "BatchPick",
    BatchPickSchema
)