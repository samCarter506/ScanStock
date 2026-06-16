const mongoose = require("mongoose");
const moment = require("moment");

const userGroupSchema =new mongoose.Schema({
    Role :{
         type: String,
         required: true,
         unique: true
    },
    DateCreate:{
        type:String,
        default: () =>
              moment().format("YYYY-MM-DD HH:mm:ss")      
    },
    LastUpdate: {
        type: String,
        default: () =>
          moment().format("YYYY-MM-DD HH:mm:ss")
    },
    LastUpdateUser: {
        type: String,
        default: null
    }
},
{
  collection: "SysUserRoles"
})

const UserGroup = mongoose.model(
    "SysUserRoles",
    userGroupSchema
)
module.exports = UserGroup;