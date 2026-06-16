const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    CategoryName:{
        type:String,
        required : true,
        unique:true
    }
},{collection:"sysProductCategory"}
)

const Category = mongoose.model(
    "sysProductCategory", 
    categorySchema
)
module.exports = Category