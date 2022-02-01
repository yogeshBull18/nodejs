const express = require('express');
const {checkSchema} = require('express-validator');
const router = express.Router();
//middleware
const registerValidation = require('../middleware/formValidation');
//controller
const usersController = require('../controllers/usersController');

 
router.get('/', usersController.users.getUsersList);
router.get('/:id', usersController.users.getUserById);
router.post('/create',checkSchema(registerValidation), usersController.users.createUser);
router.post('/update/:id',checkSchema(registerValidation), usersController.users.updateUser); 


  

module.exports = router;