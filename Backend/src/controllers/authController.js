const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req,res) => {
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                error:"All fields are required!"
            });
        }

        const existinguser = await User.findOne({email});

        if(existinguser){
            return res.status(400).json({
                error:"Email already registered"
            });
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name:name,
            email:email,
            password:hashedpassword
        });

        return res.status(201).json({
            success:true,
            message: "User registerd succesfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    }catch(error){
        return res.status(400).json({
            error:error.message
        })
    }
}

exports.login = async (req,res) =>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                error:"All fields are required"
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                error:"Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn : "id"
            }
        );

        return res.status(200).json({
            success : true,
            message: "Login successful"
        });

    }catch(error){
        return res.status(400).json({
            error:error.message
        });
    }
}