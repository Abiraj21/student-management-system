const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/studentController");

router.get("/",StudentController.getStudents);
router.get("/:id",StudentController.getStudent);
router.post("/",StudentController.addStudent);
router.put("/:id",StudentController.updateStudent);
router.delete("/:id",StudentController.deleteStudent);

module.exports = router;