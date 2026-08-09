const mongoose = require('mongoose')
const batchPick = require('./batchPick')

const BatchAllocationShema = new mongoose.Schema({
    batchPick :{
        type : mongoose.Types.ObjectId,
        ref : "BatchPick"
    },
    Order:{
        type:String,
        enum:["sysReceipts","outbound"]
    },
    product:{
        type :mongoose.Types.ObjectId,
        ref:"sysProduct"
    },
    quantity:Number,
    packed:{
        typed: Boolean,
        default:false
    }
},{
    timestamps: true
}) 

module.exports = mongoose.model(
    "BatchAllocation",
    BatchAllocationShema
)