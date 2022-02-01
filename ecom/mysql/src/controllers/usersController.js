const userModel = require('../models/usersModel');
const {validationResult} = require('express-validator');
const getUsersList  = (req, res)=> {
    userModel.getUsersList((err, users)=>{
        res.status(201).json(users);
    });
}

const getUserById = (req, res)=>{
    const userId = req.params.id;
    // console.log(userId);
    userModel.getUserById(userId,(err, users)=>{
        res.status(201).json(users)
    });
}
const createUser = (req, res)=>{ 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    } 
    const userData = new userModel(req.body);
    userModel.register(userData,(req, users)=>{
        res.status(200).json(users);
    })
}
const updateUser = (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    userModel.update(userId, userData, (req, users)=>{
        res.status(200).json(users);
    });
}
 
module.exports.users = {getUsersList, getUserById, createUser, updateUser};