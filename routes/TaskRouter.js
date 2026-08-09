const express = require("express");
const router = express.Router();

const Auth = require("../middleware/JwtService");
const TaskAssignment = require("../controllers/TaskController");

router.get("/", Auth, TaskAssignment.GetTasks);

router.get("/:id", Auth, TaskAssignment.GetTask);

router.post("/", Auth, TaskAssignment.AssignTask);

router.put("/:id", Auth, TaskAssignment.UpdateTask);

router.put("/:id/start", Auth, TaskAssignment.StartTask);

router.put("/:id/complete", Auth, TaskAssignment.CompleteTask);

router.delete("/:id", Auth, TaskAssignment.DeleteTask);

module.exports = router;