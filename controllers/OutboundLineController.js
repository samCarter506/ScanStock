const OutboundLine = require('../db_schema/outboundLine')
const Location = require ('../db_schema/location')
const Product = require('../db_schema/product')
const Outbound = require("../db_schema/outbound");

exports.GetOutboundLines = async (req,res) =>{
    try{
        const results = await OutboundLine.find({}).populate("ProductId")
                                                   .populate("LocationId");
        
        return res.status(201).json(results)
    }
    catch(err)
    {
        return res.status(500).json({
            message:err.message,
            success:true
        })
    }
}

exports.GetOutboundLine = async (req, res) => {
    try {

        const outboundLines =
            await OutboundLine.find({
                OutboundId: req.params.id
            })
            .populate("ProductId")
            .populate("LocationId");

        return res.status(200).json(outboundLines);

    } catch(err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

exports.UpdateOutboundLine = async (req, res) => {
    try {

        const outboundLine = await OutboundLine.findById(
            req.params.id
        );

        if (!outboundLine) {
            return res.status(404).json({
                success: false,
                message: "Outbound line not found"
            });
        }

        const checkProduct = await Product.findOne({
            Barcode: req.body.barcode
        });

        if (!checkProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const checkLocation = await Location.findOne({
            LocationCode: req.body.locationCode
        });

        if (!checkLocation) {
            return res.status(404).json({
                success: false,
                message: "Location not found"
            });
        }

        const oldQty = outboundLine.QuantityIssued;
        const newQty = Number(req.body.quantityIssued);

        // Reverse previous stock issue

        checkProduct.Quantity += oldQty;

        const locationStock =
            checkProduct.Locations.find(
                x =>
                    x.LocationId.toString() ===
                    checkLocation._id.toString()
            );

        if (!locationStock) {
            return res.status(400).json({
                success: false,
                message: "Product not found in location"
            });
        }

        locationStock.Quantity += oldQty;

        // Validate new stock issue

        if (checkProduct.Quantity < newQty) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock available"
            });
        }

        if (locationStock.Quantity < newQty) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock in location"
            });
        }

        // Apply new issue

        checkProduct.Quantity -= newQty;
        locationStock.Quantity -= newQty;

        await checkProduct.save();

        // Update outbound line

        outboundLine.ProductId =
            checkProduct._id;

        outboundLine.LocationId =
            checkLocation._id;

        outboundLine.QuantityIssued =
            newQty;

        outboundLine.SellingPrice =
            req.body.sellingPrice;

        outboundLine.BatchNumber =
            req.body.batchNumber;

        await outboundLine.save();

        return res.status(200).json({
            success: true,
            message: "Outbound line updated successfully",
            data: outboundLine
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

exports.CreateOutboundLine = async (req, res) => {
    try {

        const checkOutbound =
            await Outbound.findOne({
                OutboundNumber: req.body.outboundNumber
            });

        if (!checkOutbound) {
            return res.status(404).json({
                success: false,
                message: "Outbound header not found"
            });
        }

        const checkProduct =
            await Product.findOne({
                Barcode: req.body.barcode
            });

        if (!checkProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const checkLocation =
            await Location.findOne({
                LocationCode: req.body.locationCode
            });

        if (!checkLocation) {
            return res.status(404).json({
                success: false,
                message: "Location not found"
            });
        }

        const qty =
            Number(req.body.quantityIssued);

        if (checkProduct.Quantity < qty) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock available"
            });
        }

        const locationStock =
            checkProduct.Locations.find(
                x =>
                    x.LocationId.toString() ===
                    checkLocation._id.toString()
            );

        if (!locationStock) {
            return res.status(400).json({
                success: false,
                message: "Product not found in this location"
            });
        }

        if (locationStock.Quantity < qty) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock in location"
            });
        }

        const outboundLine =
            await OutboundLine.create({
                OutboundId: checkOutbound._id,
                ProductId: checkProduct._id,
                LocationId: checkLocation._id,
                QuantityIssued: qty,
                SellingPrice: req.body.sellingPrice,
                BatchNumber: req.body.batchNumber
            });

    

        checkProduct.Quantity -= qty;


        locationStock.Quantity -= qty;

        await checkProduct.save();

        return res.status(201).json({
            success: true,
            message: "Outbound line created successfully",
            data: outboundLine
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

exports.DeleteOutboundLine = async (req, res) => {
    try {

        const outboundLine =
            await OutboundLine.findById(req.params.id);

        if (!outboundLine) {
            return res.status(404).json({
                success: false,
                message: "Outbound line not found"
            });
        }

        const product =
            await Product.findById(
                outboundLine.ProductId
            );

        const location =
            await Location.findById(
                outboundLine.LocationId
            );

        // Return stock to product

        product.Quantity +=
            outboundLine.QuantityIssued;

        // Return stock to location

        const productLocation =
            product.Locations.find(
                x =>
                    x.LocationId.toString() ===
                    location._id.toString()
            );

        if (productLocation) {
            productLocation.Quantity +=
                outboundLine.QuantityIssued;
        }

        await product.save();

        await OutboundLine.findByIdAndDelete(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message:
                "Outbound line deleted and stock restored"
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};