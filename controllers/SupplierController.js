const Supplier = require('../db_schema/supplier')

exports.GetSuppliers = async (req,res)=>{
    try{
        console.log(req)
        const result = await Supplier.find({})
        
        return res.status(200).json({})
    }catch(err)
    {
        return res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

exports.GetSupplier = async (req, res) => {
    try {

        const checkSupplier = await Supplier.findOne({
            SupplierCode: req.params.id
        });

        if (!checkSupplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: checkSupplier
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

exports.CreateSupplier = async (req,res)=>{
    try{
        const checkSupplier= await Supplier.findOne({SupplierCode:req.body.supplierCode})

        if(checkSupplier)
        {
            return res.status(400).json({
                message:"Supplier already exist",
                success : false
            })
        }

        const supplier = new Supplier({
            SupplierCode:req.body.supplierCode,
            SupplierName:req.body.supplierName,
            ContactPerson:req.body.contactPerson,
            EmailAddrss:req.body.emailAddress,
            Cellphone:req.body.cellPhone,
            Province :req.body.province,
            PostalCode:req.body.postalCode,
            City:req.body.city,
            Address:req.body.address
        })

        await supplier.save();
        return res.status(200).json({
            message:"Supplier added successfully",
            success:true
        })
    }
    catch(err)
    {
        return res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

exports.UpdateSupplier = async (req,res)=>{
     try{
        const checkSupplier= await Supplier.findOne({SupplierCode:req.body.supplierCode})

        if(!checkSupplier)
        {
            return res.status(400).json({
                message:"Supplier does not exist",
                success : false
            })
        }

        const supplier = new Supplier({
            SupplierCode:req.body.supplierCode,
            SupplierName:req.body.supplierName,
            ContactPerson:req.body.contactPerson,
            EmailAddrss:req.body.emailAddress,
            Cellphone:req.body.cellPhone,
            Province :req.body.province,
            PostalCode:req.body.postalCode,
            City:req.body.city,
            Address:req.body.address,
            IsActive:req.body.isActive,
            LastUpdate:Date.now(),
            LastUpdateUser:req.body.lastUpdateUser
        })

        await supplier.save();
        return res.status(200).json({
            message:"Supplier updated successfully",
            success:true
        })
    }
    catch(err)
    {
        return res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

exports.deleteSupplier = async (req, res) => {
  try {
    const checkSupplier= await Supplier.findOneAndDelete({
      SupplierCode: req.params.id,
    });

    if (!checkSupplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Supplier deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};