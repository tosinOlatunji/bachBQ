require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Student = require("./model/Student");

const PORT = 2468;
const app = express();
const cors = require("cors");

// built-In middleware
app.use(
  cors({
    origin: ["https://bach-bq-kappa.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// test route
// app.get("/", (req, res) => {
//   res.send("Backend is up and running!");
// });

// studentRoutes
const studentRoute = require("./routes/StudentRoutes");

app.use("/", studentRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.error(err.message);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
