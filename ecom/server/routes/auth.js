const router = require('express').Router();
const User = require('../models/users');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

router.post('/register',async (req, res)=>{ 
    const newUser  = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    try{

        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
        console.log(1);
    }
    catch(err){
        res.status(500).json(err);
        console.log(0);
    }
});
router.post('/login', async(req, res)=>{
    
        try{
            const userExist = await User.findOne({username:req.body.username});
            !userExist && res.status(401).json("Wrong Details");
            const hashPasword = CryptoJS.AES.decrypt(userExist.password,process.env.PASS_SEC);
            const orignalPassword = hashPasword.toString(CryptoJS.enc.Utf8);
            orignalPassword !== req.body.password && res.status(401).json("Wrong Password");

            const accessToken = jwt.sign(
                {
                    id : userExist._id,
                    isAdmin : userExist.isAdmin,
                }, 
                process.env.JWT_SEC,
                {expiresIn:"3d"}
            );

            const {password , ...others} = userExist._doc; 

            res.status(200).json({...others,accessToken});
            
        }
        catch(err)
        {   
            res.status(500).json(err);
            console.log(0);
        }
});

module.exports = router;