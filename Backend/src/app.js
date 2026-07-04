const express = require("express");
const studentRoutes = require("./routes/studentRoutes");
const app = express();

//Middleware
app.use(express.json());

//Root Route
app.get("/", (req,res)=>{
    res.status(200).json({
        sucess:true,
        message:"Student Management API is running"
    });
});

//Student Routes
app.use("/api/students", studentRoutes);

module.exports = app;