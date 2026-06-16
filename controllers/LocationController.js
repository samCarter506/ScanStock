const Location = require('../db_schema/location')

exports.GetLocations = async (req,res)=>{
    try{
        const checkLocation = await Location.find({})

        return res.status(200).json(checkLocation)
    }catch(err){
        return res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

exports.GetLocation = async (req,res)=>{
    try{
        const checkExist = await Location.findOne({LocationCode:req.param.id})

        if(!checkExist)
        {
            return res.status(400).json({
                message:"Location doesnt exist",
                success: false
            })
        }

        return res.status(200).json(checkExist)
    }
    catch(err)
    {
        return res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

exports.CreateLocation = async (req,res)=>{
    try{
        const checkExist = await Location.findOne({LocationCode:req.body.locationCode});

        if(checkExist)
        {
            return res.status(400).json({
                message :"Location already exist",
                success:false
            })
        }
        const location = new Location({
            LocationCode:req.body.locationCode,
            LocationName:req.body.locationName,
            Description:req.body.description,
            Warehouse:req.body.warehouse,
            Aisle:req.body.aisle,
            Shelf:req.body.shelf,
            Bin:req.body.bin,
            CheckDigit:req.body.checkDigit,
            IsActive:req.body.isActive
        })

        location.save()
         return res.status(200).json({
            message:"Location added successfully",
            success:true
         })
    }catch(err)
    {
        return res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

exports.UpdateLocation = async (req,res)=>{
    try{
        const checkExist = await Location.findOne({LocationCode:req.param.id})

        if(!checkExist)
        {
            return res.status(400).json({
                message:"Location not found",
                success:false
            })
        }

         const location = new Location({
            LocationCode:req.body.locationCode,
            LocationName:req.body.locationName,
            Description:req.body.description,
            Warehouse:req.body.warehouse,
            Aisle:req.body.aisle,
            Shelf:req.body.shelf,
            Bin:req.body.bin,
            CheckDigit:req.body.checkDigit,
            IsActive:req.body.isActive,
            LastUpdate:Date.UTC,
            LastUpdateUser:req.body.LastUpdateUser
        })

        location.save()
        return res.status(200).json({
            message:"Location updated successfully",
            success:true
        })
    }catch(err)
    {
        return res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

exports.DeleteLocation = async (req,res)=>{
      try {
    const LocationCheck = await Location.findOneAndDelete({
      LocationCode: req.params.id,
    });

    if (!LocationCheck) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Location deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}