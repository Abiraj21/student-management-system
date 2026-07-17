const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes")
const app = express();

//Middleware
app.use(express.json());

//Root Route
app.get("/", (req,res)=>{
    res.status(200).json({
        success:true,
        message:"Student Management API is running"
    });
});

//Student Routes
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;