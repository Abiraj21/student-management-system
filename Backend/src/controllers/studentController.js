const Student = require("../models/Student");
const AppError = require("../utils/AppError");
const mongoose = require("mongoose");

// exports.getStudents = async (req, res, next) => {
//     try{
//         //throw new Error("Testing global error handler");
        
//         const allStudents = await Student.find();
//         res.json(allStudents)
//     }catch(error){
//         next(error);
//     }
// };

exports.getStudents = async (req, res, next) => {
    try{
        const page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        
        limit = Math.min(limit, 100);
        
        const skip = ( page - 1 ) * limit;

        const allStudents = await Student.find().skip(skip).limit(limit);
        const totalStudents = await Student.countDocuments();

        const totalPages = Math.ceil(totalStudents/limit);

        return res.status(200).json({
            Success: true,
            data: allStudents,
            pagination: {
                page,
                limit,
                total: totalStudents,
                totalPages
            }
        });
    }catch(error){
        next(error);
    }
};

exports.getStudent =  async (req,res,next) => {
    try{
        const student = await Student.findById(req.params.id);

        //throw new Error("Testing global error handler");

        if(!mongoose.isValidObjectId(req.params.id)){
            throw new AppError("Invalid student ID", 400);
        }
        if(!student){
            throw new AppError("Student not found", 404);
        }else{
            Success:true,
            res.json(student);
        }
    }catch(error){
        next(error);
    }
};

exports.addStudent = async (req,res,next) => {
    try{

        const {studentId, firstName, lastName, email, phone, course, year, profileImage, createdBy} = req.body;

        if(!studentId || !firstName || !lastName || !email || !phone || !course || !year){
            return res.status(400).json({
                error: "The value cant be empty"
            });
        }else if(isNaN(year)){
            return res.status(400).json({
                error: "The values of the year must be numerator"
            });
        }else{
            const student = await Student.create({
                "studentId":studentId,
                "firstName":firstName,
                "lastName":lastName,
                "email":email,
                "phone":phone,
                "course":course,
                "year":year,
                "profileImage":profileImage,
                "createdBy":createdBy
            });

            res.status(201).json({
                "message":"The student has been created!",
                student
            })
        }
    }catch(error){
        next(error);
    }
};

exports.updateStudent = async (req,res,next) => {
    try{
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        );

        if(!student){
            res.status(400).json({
                error:"The student does not exist"
            })
        }else{
            res.status(200).json({
                "message":"The student details has been updated",
                student
            });
        }
    }catch(error){
        next(error);
    }
};

exports.deleteStudent = async (req,res,next) => {
    try{
        const student = await Student.findByIdAndDelete(req.params.id);

        if(!student){
            res.status(404).json({
                error:"Student does not exist"
            });
        }else{
            res.status(200).json({
                message:"The student has been deleted",
                student
            })
        }
    }catch(error){
        next(error);
    }
};