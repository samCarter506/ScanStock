const Customer = require('../db_schema/customer')

exports.GetCustomers = async (req,res)=>{
    try{
       
        const result = await Customer.find({})
        
        return res.status(200).json(result)
    }catch(err)
    {
        return res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

exports.getCustomer = async (req, res)=>{
    try{
        const checkCustomer = await Customer.findOne({CustomerCode:req.params.id})

        if(!checkCustomer)
        {
            return res.status(400).json({
                message:"Customer not found",
                success :false
            })
        }

        return res.status(200).json(checkCustomer)
    }
    catch(err)
    {
        return res.status(500).json({
            message:err.message,
            sunccess:false
        })
    }
}

exports.CreateCustomer = async (req,res)=>{
    try{
        const checkCustomer= await Customer.findOne({CustomerCode:req.body.supplierCode})

        if(checkCustomer)
        {
            return res.status(400).json({
                message:"Customer already exist",
                success : false
            })
        }

        const supplier = new Customer({
            CustomerCode:req.body.customerCode,
            CustomerName:req.body.customerName,
            ContactPerson:req.body.contactPerson,
            EmailAddrss:req.body.emailAddress,
            Cellphone:req.body.cellPhone,
            Province :req.body.province,
            PostalCode:req.body.postalCode,
            City:req.body.city,
            Address:req.body.address,
            CustomerType:req.body.cusomerType,
            CreditLimit:req.body.creditLimit,
            TaxNumber:req.body.taxNumber,
            Balance:req.body.balance
        })

        await supplier.save();
        return res.status(200).json({
            message:"Customer added successfully",
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

exports.UpdateCustomer= async (req,res)=>{
     try{
        const checkCustomer= await Customer.findOne({CustomerCode:req.body.customerCode})

        if(!checkCustomer)
        {
            return res.status(400).json({
                message:"Customer does not exist",
                success : false
            })
        }

       
        checkCustomer.CustomerCode=req.body.customerCode ?? checkCustomer.CustomerCode;
        checkCustomer.CustomerName=req.body.customerName ?? checkCustomer.CustomerName;
        checkCustomer.ContactPerson=req.body.contactPerson ?? checkCustomer.ContactPerson;
        checkCustomer.EmailAddrss=req.body.emailAddress ?? checkCustomer.EmailAddrss;
        checkCustomer.Cellphone=req.body.cellPhone ?? checkCustomer.Cellphone;
        checkCustomer.Province =req.body.province ?? checkCustomer.Province;
        checkCustomer.PostalCode=req.body.postalCode ?? checkCustomer.PostalCode;
        checkCustomer.City=req.body.city ?? checkCustomer.City;
        checkCustomer.Address=req.body.address ?? checkCustomer.Address;
        checkCustomer.IsActive=req.body.isActive ?? checkCustomer.IsActive;
        checkCustomer.CustomerType=req.body.cusomerType ?? checkCustomer.CustomerType;
        checkCustomer.CreditLimit=req.body.creditLimit ?? checkCustomer.CreditLimit;
        checkCustomer.TaxNumber=req.body.taxNumber ?? checkCustomer.TaxNumber;
        checkCustomer.Balance=req.body.balance ?? checkCustomer.Balance;
        checkCustomer.LastUpdate=Date.now() ?? checkCustomer.LastUpdate;
        checkCustomer.LastUpdateUser=req.body.lastUpdateUser ?? checkCustomer.LastUpdateUser;
       

        await customer.save();
        return res.status(200).json({
            message:"Customer updated successfully",
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

exports.deleteCustomer = async (req, res) => {
  try {
    const checkCustomer= await Customer.findOneAndDelete({
      CustomerCode: req.params.id,
    });

    if (!checkCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};