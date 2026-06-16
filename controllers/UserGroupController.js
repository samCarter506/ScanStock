var UserGroup  = require('../db_schema/userGroups');
var moment   = require('moment');
const { mongoosePopulatedDocumentMarker } = require('mongoose');

exports.GetUserGroups = async (req,res)=>{
    try{
        const results= await UserGroup.find({});

        res.status(200).json(results);
    }catch(err)
    {
      res.status(500).json({
      success: false,
      message: err.message,
    });
    }
}

exports.GetUserGroup = async (req,res)=>{
    console.log(req)
    try{
        console.log(req.param.id)
        const results = await UserGroup.findOne(
            {Role:req.param.id}
        )

        if(!results)
        {
            res.status(204).json({
                message:"Record not found",
                success: false
            })
        }

        res.status(200).json(results)
    }
    catch(err)
    {
        res.status(500).json({
            message:err.message,
            success: false
        })
    }
}

exports.CreateUserGroup = async (req,res)=>{
    try{
        const checkExist = await UserGroup.findOne({Role:req.body.role})

        if(checkExist)
        {
            res.status(400).json({
                message:"Role already exits",
                success:false
            })
        }

        const grp = new UserGroup({
            Role: req.body.role,
            DateCreate: moment().format("YYYY-MM-DD HH:mm:ss"),
            LastUpdate:moment().format("YYYY-MM-DD HH:mm:ss")
        })

        await grp.save();
        res.status(200).json({
            message:"User Role added successfully",
            success:true
        })
    }
    catch(err)
    {
        res.status(500).json({
            message:err.message,
            suceess:false
        })
    }
}

exports.UpdateGroup = async (req,res)=>{
    try{
        const checkExist = await UserGroup.findOne({Role:req.param.id})

        if(!checkExist)
        {
            res.status(204).json({
                message:"Record not found",
                success:false
            })
        }

        var userGrp = new UserGroup({
            Role:req.body.role,
            LastUpdate:moment().format("YYYY-MM-DD HH:mm:ss"),
            LastUpdateUser: req.body.user
        })

        userGrp.save();
        res.status(200).json({
            message:"Role updated successfully",
            success:true
        })
    }catch(err)
    {
        res.status(500).json({
            message:err.message,
            success:true
        })
    }
}

exports.DeleteUserGroup = async (req,res)=>{
    try{
        const results = await UserGroup.findOneAndDelete({
            Role:req.param.id
        })

        if(!results)
        {
            res.status(204).json({
                message:"Role not found",
                success:false
            })
        }

        res.status(200).json({
            message:"Role delete successfully",
            success: true
        })
    }
    catch(err)
    {
        res.status(500).json({
            message:err.message,
            suceess:false
        })
    }
}