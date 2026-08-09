const Task = require("../db_schema/task");
const User = require("../db_schema/user");
const moment = require("moment");


exports.GetTasks = async (req, res) => {
    try {

        const tasks = await Task.find({})
            .populate("AssignedTo")
            .sort({ AssignDate: -1 });

        return res.status(200).json(tasks);

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


exports.GetTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id)
            .populate("AssignedTo");

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        return res.status(200).json(task);

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


exports.AssignTask = async (req, res) => {

    try {

        const checkUser = await User.findOne({
            UserID: req.body.AssignedTo
        });

        if (!checkUser) {

            return res.status(404).json({
                success: false,
                message: "Assigned user not found"
            });

        }

        const TaskNumber = "Tsk"+moment.format("YYYYMMDDHHmmss");
        const task = new Task({

            TaskNumber: TaskNumber,

            TaskType: req.body.TaskType,

            ReferenceNumber: req.body.ReferenceNumber,

            AssignedTo: checkUser._id,

            Priority: req.body.Priority,

            DueDate: req.body.DueDate,

            Status: "Assigned",

            Notes: req.body.Notes,

            AssignDate: moment().format("YYYY-MM-DD HH:mm:ss"),

            CreatedBy: req.body.CreatedBy,

            LastUpdate: moment().format("YYYY-MM-DD HH:mm:ss")

        });

        await task.save();

        return res.status(201).json({
            success: true,
            message: "Task assigned successfully."
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


exports.UpdateTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        if (req.body.TaskType)
            task.TaskType = req.body.TaskType;

        if (req.body.Priority)
            task.Priority = req.body.Priority;

        if (req.body.ReferenceNumber)
            task.ReferenceNumber = req.body.ReferenceNumber;

        if (req.body.DueDate)
            task.DueDate = req.body.DueDate;

        if (req.body.Notes)
            task.Notes = req.body.Notes;

        if (req.body.Status)
            task.Status = req.body.Status;

        task.LastUpdate =
            moment().format("YYYY-MM-DD HH:mm:ss");

        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task updated successfully."
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


exports.StartTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        task.Status = "In Progress";

        task.StartDate =
            moment().format("YYYY-MM-DD HH:mm:ss");

        task.LastUpdate =
            moment().format("YYYY-MM-DD HH:mm:ss");

        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task started successfully."
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


exports.CompleteTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        task.Status = "Completed";

        task.CompletedDate =
            moment().format("YYYY-MM-DD HH:mm:ss");

        task.LastUpdate =
            moment().format("YYYY-MM-DD HH:mm:ss");

        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task completed successfully."
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};


exports.DeleteTask = async (req, res) => {

    try {

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully."
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};