const express = require("express");
const {
  createStudent,
  loginStudent,
  updateStudent,
  deleteStudent,
  getStudents,
  getStudentById,
} = require("../controllers/StudentControllers");

const router = express.Router();
console.log({ createStudent, loginStudent, updateStudent, deleteStudent });

router.post("/", createStudent);
router.post("/login", loginStudent);
router.get("/", getStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
