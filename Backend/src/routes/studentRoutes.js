const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/studentController");
const protect = require("../middlewares/authMiddleware");

router.get("/", protect, StudentController.getStudents);
router.get("/:id", protect, StudentController.getStudent);
router.post("/", protect, StudentController.addStudent);
router.put("/:id", protect, StudentController.updateStudent);
router.delete("/:id", protect, StudentController.deleteStudent);

module.exports = router;