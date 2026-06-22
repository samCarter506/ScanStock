const ReceiptLine = require("../db_schema/ReceiptLine");
const Location = require("../db_schema/location");
const Product = require("../db_schema/product");
const Supplier = require("../db_schema/supplier");
const Receipt = require("../db_schema/Receipt");


exports.GetReceiptLines = async (req, res) => {
    try {

        const results = await ReceiptLine.find({})
            .populate("ReceiptId")
            .populate("ProductId")
            .populate("LocationId");

        return res.status(200).json(results);

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

exports.GetReceiptLine = async (req, res) => {
    try {

        const receiptLine =
            await ReceiptLine.find({
            ReceiptId: req.params.id
        })
                .populate("ReceiptId")
                .populate("ProductId")
                .populate("LocationId");
        console.log(receiptLine)
        if (!receiptLine) {
            return res.status(404).json({
                success: false,
                message: "Receipt line not found"
            });
        }

        return res.status(200).json(receiptLine);

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};
exports.GetReceiptLineById = async (req, res) => {
    try {
        const receiptLine = await ReceiptLine.findById(req.params.id)
            .populate("ReceiptId")
            .populate("ProductId")
            .populate("LocationId");

        if (!receiptLine) {
            return res.status(404).json({
                success: false,
                message: "Receipt line not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: receiptLine
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


exports.GetReceiptLinesByReceipt = async (req, res) => {
    try {
        const receiptLines = await ReceiptLine.find({
            ReceiptId: req.params.receiptId
        })
            .populate("ReceiptId")
            .populate("ProductId")
            .populate("LocationId");

        return res.status(200).json({
            success: true,
            data: receiptLines
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
exports.CreateReceiptLine = async (req, res) => {
    try {

        const checkSupplier = await Supplier.findOne({
            SupplierCode: req.body.supplierCode
        });

        const checkReceipt = await Receipt.findOne({
            ReceiptNumber: req.body.receiptNumber
        });

        const checkProduct = await Product.findOne({
            Barcode: req.body.barcode
        });

        const checkLocation = await Location.findOne({
            LocationCode: req.body.locationCode
        });

        if (!checkSupplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier not found"
            });
        }

        if (!checkReceipt) {
            return res.status(404).json({
                success: false,
                message: "Receipt not found"
            });
        }

        if (!checkProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (!checkLocation) {
            return res.status(404).json({
                success: false,
                message: "Location not found"
            });
        }

        const receiptLine =
            await ReceiptLine.create({
                ReceiptId: checkReceipt._id,
                ProductId: checkProduct._id,
                LocationId: checkLocation._id,
                QuantityReceived: req.body.quantityReceived,
                CostPrice: req.body.costPrice,
                BatchNumber: req.body.batchNumber,
                ExpiryDate: req.body.expiryDate
            });

        // Update Product Total Stock

        checkProduct.Quantity +=
            Number(req.body.quantityReceived);

        // Update Product Location Stock

        const locationStock =
            checkProduct.Locations.find(
                x =>
                    x.LocationId.toString() ===
                    checkLocation._id.toString()
            );

        if (locationStock) {

            locationStock.Quantity +=Number(req.body.quantityReceived);

        } else {

            checkProduct.Locations.push({
                LocationId: checkLocation._id,
                Quantity: Number(req.body.quantityReceived),
                MinimumStock:
                    req.body.minimumStock || 0
            });

        }

        await checkProduct.save();

        return res.status(201).json({
            success: true,
            message: "Receipt line created successfully",
            data: receiptLine
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

exports.UpdateReceiptLine = async (req, res) => {
    try {

        const receiptLine =
            await ReceiptLine.findById(req.params.id);

        if (!receiptLine) {
            return res.status(404).json({
                success: false,
                message: "Receipt line not found"
            });
        }

        receiptLine.QuantityReceived =
            req.body.quantityReceived ??
            receiptLine.QuantityReceived;

        receiptLine.CostPrice =
            req.body.costPrice ??
            receiptLine.CostPrice;

        receiptLine.BatchNumber =
            req.body.batchNumber ??
            receiptLine.BatchNumber;

        receiptLine.ExpiryDate =
            req.body.expiryDate ??
            receiptLine.ExpiryDate;

        await receiptLine.save();

        return res.status(200).json({
            success: true,
            message: "Receipt line updated successfully",
            data: receiptLine
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

exports.DeleteReceiptLine = async (req, res) => {
    try {

        const receiptLine =
            await ReceiptLine.findByIdAndDelete(
                req.params.id
            );

        if (!receiptLine) {
            return res.status(404).json({
                success: false,
                message: "Receipt line not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Receipt line deleted successfully"
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