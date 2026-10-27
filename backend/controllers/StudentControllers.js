const Student = require("../model/Student");

// async and try
const createStudent = async (req, res) => {
  try {
    const { name, email, age, department, level, phone } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    const student = new Student({ name, email, age, department, level, phone });
    await student.save();

    res.status(200).json("User Account Created");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { name, email, level } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    const query = { name, email };
    if (level) query.level = Number(level);

    const student = await Student.findOne(query);

    if (!student) {
      return res.status(400).json({ message: "Invalid Name, Email, or Level" });
    }
    return res.status(200).json({
      message: "Login successful",
      student,
    });

    // const user = await User.findOne({ name, email, level });
    // if (!user) return console.log("invalid email or password");

    // console.log("user: ", user);
    // const token = jwt.sign(
    //   { id: user._id, name: user.name, email: user.email },
    //   process.env.JWT_KEY,
    //   {
    //     expiresIn: "30m",
    //   },
    // );

    // res.status(200).json(token);
  } catch (err) {
    console.error("Login Error:", err.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    // if (!students)
    //   return res.status(404).json("No students found");
    // }

    res.status(200).json(students);
  } catch (err) {
    console.error("Get student Error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json("Student Not Found");
    }

    res.status(200).json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Student Updated Succesfully", student: updateStudent });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student Successfully Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createStudent,
  loginStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
