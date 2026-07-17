const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
        studentId: {
            type:String,
            unique: true,
            required: true,
            trim: true,
        },
        firstName: {
            type:String,
            required: true,
            trim: true,
        },
        lastName: {
            type:String,
            required: true,
            trim: true,
        },
        email: {
            type:String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type:String,
            required: true,
            trim: true,
        },
        course: {
            type:String,
            required: true,
            trim: true,
        },
        year: {
            type:Number,
            required: true,
            min: 1,
            max: 4,
        },
        profileImage: {
            type:String,
            default: "default-profile.png"
        },
        createdBy: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Student", studentSchema);