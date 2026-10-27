const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  department: { type: String, required: true },
  level: { type: String, required: true },
  phone: { type: String, required: true },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
