const Student = require("../models/Student");

exports.getStudents = async (req, res) => {
    try{
        const allStudents = await Student.find();
        res.json(allStudents)
    }catch(error){
        return res.status(500).json({
            error: error.message
        });
    }
};

exports.getStudent =  async (req,res) => {
    try{
        const student = await Student.findById(req.params.id);

        if(!student){
            res.status(404).json({
                error: "The student does not exist"
            });
        }else{
            Success:true,
            res.json(student);
        }
    }catch(error){
        res.status(400).json({
            error:error.message
        });
    }
};

exports.addStudent = async (req,res) => {
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
        res.status(400).json({
            error:error.message
        });
    }
};

exports.updateStudent = async (req,res) => {
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
        res.status(400).json({
            error:error.message
        });
    }
};

exports.deleteStudent = async (req,res) => {
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
        res.status(400).json({
            error:error.message
        });
    }
};