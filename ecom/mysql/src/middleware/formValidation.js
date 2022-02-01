const userModel = require('../models/usersModel');
const registrationSchema = {
    name: {
        notEmpty: true,
        errorMessage: "Name field cannot be empty"
    },  
    email: {
        notEmpty: true,        
        isEmail: {
            bail: true,
            errorMessage: "Enter Correct Email Format : (some@examle.com)",
          },
        errorMessage: `Email field cannot be empty`,
        
    },  
    password: {
        notEmpty: true,
        errorMessage: "Password field cannot be empty"
    },           
}

module.exports =  registrationSchema;

