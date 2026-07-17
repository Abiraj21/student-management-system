const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required : true,
        trim: true
    },
    role: {
        type: String,
        default: "staff",
        trim: true
    }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User",userSchema);