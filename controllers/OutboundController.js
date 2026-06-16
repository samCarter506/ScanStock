const Outbound = require('../db_schema/outbound')
const Customer = require('../db_schema/customer')

exports.GetOutbounds = async (req , res)=>{
    try{
        const results = await Outbound.find({}).populate("CustomerId");

        return res.status(201).json(results)
    }
    catch(err)
    {
        return res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

exports.GetOutbound = async (req,res)=>{
    try{
        const checkExist = await Outbound.findOne({OutboundNumber:req.params.id}).populate("CustomerId")

        if(!checkExist)
        {
            return res.status(401).json({
                message:"Outbound header dont exist",
                success:false
            })
        }

        return res.status(201).json(checkExist)
    }
    catch(err)
    {
        return res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

exports.CreateOutbound = async (req,res)=>{
    try{
        const checkOutbound = await Outbound.findOne({OutboundNumber:req.body.outboundNumber})
        const checkCustomer = await Customer.findOne({CustomerCode:req.body.customerCode})

        if(checkOutbound)
        {
            return res.status(401).json({
                message:"Outbound header already exist",
                success:false
            })
        }

        if(!checkCustomer)
        {
            return res.status(401).json({
                message:"Customer doesn't exist",
                success:false
            })
        }

        const outbound = new Outbound({
            CustomerId:checkCustomer._id,
            Notes:req.body.notes,
            Status:req.body.status,
            ReferenceNumber:req.body.referenceNumber,
            OutboundNumber:req.body.outboundNumber,
            TotalItems:req.body.totalItems
        })

        await outbound.save();
        return res.status(201).json({
            message:"Outbound header added successfully",
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

exports.UpdateOutbound = async (req,res)=>{
    try{
        const checkOutbound = await Outbound.findOne({OutboundNumber:req.body.outboundNumber})
        const checkCustomer = await Customer.findOne({CustomerCode:req.body.customerCode})

        if(checkOutbound)
        {
            return res.status(401).json({
                message:"Outbound header already exist",
                success:false
            })
        }

        if(!checkCustomer)
        {
            return res.status(401).json({
                message:"Customer doesn't exist",
                success:false
            })
        }

   
        checkOutbound.CustomerId=checkCustomer._id ?? checkOutbound.CustomerId;
        checkOutbound.Notes=req.body.notes ?? checkOutbound.Notes;
        checkOutbound.Status=req.body.status ?? checkOutbound.Status;
        checkOutbound.ReferenceNumber=req.body.referenceNumber ?? checkOutbound.ReferenceNumber;
        checkOutbound.OutboundNumber=req.body.outboundNumber ?? checkOutbound.OutboundNumber;
        checkOutbound.TotalItems=req.body.totalItems ?? checkOutbound.TotalItems;
        
        await outbound.save();

        return res.status(201).json({
            message:"Outbound header added successfully",
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

exports.deleteOutbound = async (req, res) => {
    try {
        const checkOutbound = await Outbound.findOneAndDelete({
            OutboundNumber: req.params.id,
        });

        if (!checkOutbound) {
            return res.status(404).json({
                success: false,
                message: "Outbound not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Outbound deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};