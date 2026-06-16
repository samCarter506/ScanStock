const Receipt = require('../db_schema/Receipt')
const Supplier = require('../db_schema/supplier')

exports.GetReceipts = async (req, res) => {
    try {
        const results = await Receipt.find({});

        return res.status(200).json(results)

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
}

exports.GetReceipt = async (req, res) => {
    try {
        const checkReceipt = await Receipt.findOne({ ReceiptNumber: req.params.id })

        if (!checkReceipt) {
            return res.status(400).json({
                message: "Receipt not found",
                success: false
            })
        }

        return res.status(200).json(checkReceipt)
    }
    catch (err) {
        return res.status(500).json({
            message: err.message,
            sunccess: false
        })
    }
}

exports.CreateReceipt = async (req, res) => {
    try {
        const checkReceipt = await Receipt.findOne({ ReceiptNumber: req.body.receiptNumber })
        const checkSupplier = await Supplier.findOne({ SupplierCode: req.body.supplierCode })

        if (checkReceipt) {
            return res.status(400).json({
                message: "Receipt already exist",
                success: false
            })
        }
        if (!checkSupplier) {
            return res.status(400).json({
                message: "Supplier already exist",
                success: false
            })
        }

        const receipt = new Receipt({
            ReceiptNumber: req.body.receiptNumber,
            SupplierId: checkSupplier._id,
            InvoiceNumber: req.body.invoiceNumber,
            Notes: req.body.notes,
            TotalItems: req.body.totalItems
        })

        await receipt.save();
        return res.status(200).json({
            message: "Receipt added successfully",
            success: true
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
}

exports.UpdateReceipt = async (req, res) => {
    try {
        const checkReceipt = await Receipt.findOne({ ReceiptNumber: req.body.receiptNumber })

        if (!checkReceipt) {
            return res.status(400).json({
                message: "Receipt does not exist",
                success: false
            })
        }

        checkReceipt.SupplierId = checkSupplier._id;
        checkReceipt.InvoiceNumber = req.body.invoiceNumber;
        checkReceipt.Notes = req.body.notes;
        checkReceipt.TotalItems = req.body.totalItems;
        checkReceipt.Status = req.body.status;
        checkReceipt.LastUpdateUser = req.body.lastUpdateUser;

        await receipt.save();
        return res.status(200).json({
            message: "Receipt updated successfully",
            success: true
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false
        })
    }
}

exports.deleteReceipt = async (req, res) => {
    try {
        const checkReceipt = await Receipt.findOneAndDelete({
            ReceiptNumber: req.params.id,
        });

        if (!checkReceipt) {
            return res.status(404).json({
                success: false,
                message: "Receipt not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Receipt deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};