const Report = require("../db_schema/report");

// ======================================
// GET ALL REPORTS
// ======================================
exports.GetReports = async (req, res) => {
    try {

        const reports = await Report.find({})
            .sort({ CreateDate: -1 });

        return res.status(200).json(reports);

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// ======================================
// GET REPORT BY REPORT NUMBER
// ======================================
exports.GetReport = async (req, res) => {
    try {

        const report = await Report.findOne({
            ReportNumber: req.params.id
        });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        return res.status(200).json(report);

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// ======================================
// CREATE REPORT
// ======================================
exports.CreateReport = async (req, res) => {
    try {

        const reportExist = await Report.findOne({
            ReportNumber: req.body.reportNumber
        });

        if (reportExist) {
            return res.status(400).json({
                success: false,
                message: "Report already exists"
            });
        }

        const report = new Report({
            ReportNumber: req.body.reportNumber,
            ReportType: req.body.reportType,
            FromDate: req.body.fromDate,
            ToDate: req.body.toDate,
            GeneratedBy: req.body.generatedBy,
            TotalRecords: req.body.totalRecords || 0,
            Status: req.body.status || "Pending",
            FileName: req.body.fileName,
            FilePath: req.body.filePath,
            Notes: req.body.notes
        });

        await report.save();

        return res.status(201).json({
            success: true,
            message: "Report created successfully",
            data: report
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// ======================================
// UPDATE REPORT
// ======================================
exports.UpdateReport = async (req, res) => {
    try {

        const report = await Report.findOne({
            ReportNumber: req.params.id
        });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        report.ReportType =
            req.body.reportType || report.ReportType;

        report.FromDate =
            req.body.fromDate || report.FromDate;

        report.ToDate =
            req.body.toDate || report.ToDate;

        report.GeneratedBy =
            req.body.generatedBy || report.GeneratedBy;

        report.TotalRecords =
            req.body.totalRecords ?? report.TotalRecords;

        report.Status =
            req.body.status || report.Status;

        report.FileName =
            req.body.fileName || report.FileName;

        report.FilePath =
            req.body.filePath || report.FilePath;

        report.Notes =
            req.body.notes || report.Notes;

        await report.save();

        return res.status(200).json({
            success: true,
            message: "Report updated successfully",
            data: report
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// ======================================
// DELETE REPORT
// ======================================
exports.DeleteReport = async (req, res) => {
    try {

        const report = await Report.findOneAndDelete({
            ReportNumber: req.params.id
        });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Report deleted successfully"
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};