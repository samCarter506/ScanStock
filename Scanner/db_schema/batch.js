const mongoose = require('mongoose');

const BatchSchema = new mongoose.Schema({
    BatchNumber : {
        type : String,
        required : true,
        uniquen:true
    },
    status:{
        type:String,
        enum:["Pending","Assigned","Picking","Sorting","Completed","Cancelled"],
        default:"Pending"
    },
    Picker:{
        type : mongoose.Types.ObjectId,
        ref :"ScannerUsers"
    },
    priority:{
        type:Number,
        default:1
    },
    totalOrders:Number,
    totalItems:Number,
    startedAt:Date,
    completedAt:Date,

},{
    timestamps:true
});

module.exports= mongoose.model(
    "Batch",
    BatchSchema
)