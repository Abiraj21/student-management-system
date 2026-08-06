const { body, validationResult } = require("express-validator");

exports.registerValidation = [
    body("name")
        .notEmpty()
        .withMessage("Name is required"),
    body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("Please enter a valid email"),
    body("password")
        .notEmpty()
        .withMessage("The password should not be empty")
        .isLength({ min: 6 })
        .withMessage("The password length minimum should be 6")
];

exports.validate = (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            success:false,
            errors:errors.array()
        });
    }

    next();
};