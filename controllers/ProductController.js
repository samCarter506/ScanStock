const Product = require('../db_schema/product')
const Category = require('../db_schema/category')
const Location = require('../db_schema/location')
const bwipjs = require("bwip-js");
const fs = require("fs");
const path = require("path");

exports.GetProducts = async (req,res)=>{
    try{
        const result = await Product.find({})

        return res.status(200).json(result)
    }
    catch(err)
    {
        return res.status(500).json({
            message:err.message,
            success:true
        })
    }
}

exports.GetProductByBarcode = async (req, res) => {

    const product =
      await Product.findOne({
          Barcode: req.params.barcode
      });

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    return res.status(200).json(product);
}

exports.GetProduct = async (req,res)=>{
    try{
        const checkExist = await Product.findOne({Barcode:req.params.id})

        if(!checkExist)
        {
            return res.status(400).json({
                message:"Invalid barcode scanned",
                success:false
            })
        }

        return res.status(200).json(checkExist)
    }catch(err)
    {
        return res.status(500).json({
            message:err.message,
            success :false
        })
    }
}

exports.CreateProduct = async (req,res)=>{
    try{
       
        const checkExist= await Product.findOne({Barcode:req.body.barcode})
        const checkCategory = await Category.findOne({CategoryName:req.body.category})
        
        const checkLocation = await Location.findOne({LocationCode:req.body.locationCode})
  
        if(checkExist)
        {
            return res.status(400).json({
                message : "Product already exist",
                success:false
            })
        }

        if (!checkCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        if(!checkLocation){
            return res.status(404).json({
                success:false,
                message:"Location not found" 
            })
        }
      
        const prod = new Product({
                Barcode: req.body.barcode,
                ProductName: req.body.productName,
                Description: req.body.description,
                Quantity: req.body.quantity,
                MinimumStock: req.body.minimumStock,
                CostPrice: req.body.costPrice,
                SellingPrice: req.body.sellingPrice,
                ExpiryDate: req.body.expiryDate,
                CategoryId: checkCategory._id,
                Locations:[{
                    LocationId:checkLocation._id,
                    Quantity: req.body.quantity,
                    MinimumStock: req.body.minimumStock
                 }]
        })

        await prod.save();

        return res.status(201).json({
            message:"Product added successfully",
            success: true
        })
    }catch(err)
    {
        return res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

exports.UpdateProduct = async (req,res)=>{
    try{
        const checkExist= await Product.findOneAndUpdate({Barcode:req.body.barcode})
        const checkCategory = await Category.findOne({CategoryName:req.body.category})
        const checkLocation = await Location.findOne({LocationCode:req.body.locationCode})
        if(!checkExist)
        {
            return res.status(400).json({
                message : "Product does not exist",
                success:false
            })
        }

        if (!checkCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        if(!checkLocation){
            return res.status(404).json({
                success:false,
                message:"Location not found" 
            })
        }

         const prod = new Product({
                Barcode: req.body.barcode,
                ProductName: req.body.productName,
                Description: req.body.description,
                Quantity: req.body.quantity,
                MinimumStock: req.body.minimumStock,
                CostPrice: req.body.costPrice,
                SellingPrice: req.body.sellingPrice,
                ExpiryDate: req.body.expiryDate,
                CategoryId: checkCategory._id,
                Locations:[{
                    LocationId:checkLocation._id,
                    Quantity: req.body.quantity,
                    MinimumStock: req.body.minimumStock
                 }]
        })

        await prod.save();

        return res.status(201).json({
            message:"Product updated successfully",
            success: true
        })
    }catch(err)
    {
        return res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

exports.DeleteProduct = async (req,res)=>{
    try{
        const result = await Product.findOneAndDelete({Barcode: req.Param.barcode})
        if(!result)
        {
            return res.status(400).json({
                message:"Product not found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Product deleted successfully",
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

exports.GenerateBarcode = async (req, res) => {
    try {

        const product = await Product.findOne({
            Barcode: req.params.barcode
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const png = await bwipjs.toBuffer({
            bcid: "code128",
            text: product.Barcode,
            scale: 3,
            height: 10,
            includetext: true,
            textxalign: "center"
        });

        const filePath = path.join(
            __dirname,
            "../barcodes",
            `${product.Barcode}.png`
        );

        fs.writeFileSync(filePath, png);

        return res.status(200).json({
            success: true,
            message: "Barcode generated",
            file: filePath
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};