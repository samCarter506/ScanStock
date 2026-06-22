const User = require('../db_schema/user');
const jwt = require("jsonwebtoken");
const JwtSecret = require('../config/config.json').JwtSecret

exports.Login = async (req,res)=>{
    try{
        console.log(req.body)
         const userExist = await User.findOne(
              { UserID: req.body.userId}
            );
       
        if(!userExist)
        {
            return res.status(401).json({
                message:"Invalid username or password",
                success : false
            });
        }

        const validPassword = await userExist.verifyPassword(req.body.password);

        
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const token = jwt.sign({
            "UserId":userExist.UserID,
            "id" : userExist._id,
            "FirstName":userExist.FirstName,
            "LastName":userExist.LastName,
            "UserGroup":userExist.UserGroup
        },
        JwtSecret,
         {
             expiresIn: "8h"
         }
        );

        return res.status(200).json({
        success: true,
        token,
        user: {
            id: userExist._id,
            UserID: userExist.UserID,
            FirstName: userExist.FirstName,
            LastName: userExist.LastName
        }
    });
    }catch(err)
    {
        res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

exports.Logout = async (req,res)=>{
    try
    {
       return res.status(200).json({
         success: true,
         message: "Logged out successfully"
        });

    }catch(err)
    {
        res.status(500).json({
            message:err.message,
            success:false
        })
    }
}