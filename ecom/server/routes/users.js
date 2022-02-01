const router = require('express').Router();
const User = require('../models/users');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');

// router.get('/userTest',(res, req)=>{
//     req.send('as');
// })

// router.post('/userPost',(req, res)=>{
//     const username = req.body.username;
//     res.send(username);
// })

router.put('/:id', verifyTokenAndAuthorization, async (req, res)=>{ 
    // console.log(req);
    try
    {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
        )
        res.status(200).json('Update User');
    }
    catch(err)
    {
        res.status(401).json('Undefined ID');
    }
})

router.get('/', verifyTokenAndAdmin,async (req, res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);

    }
    catch(err){
        res.status(500).json(err);
    }
});

router.get("/find/:id",verifyTokenAndAdmin ,async(req, res) => {
    const user = await User.findById(req.params.id);
    const {password, ...other} = user._doc;

    res.status(200).json(other);    
});

router.delete("/delete/:id",verifyTokenAndAdmin ,async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json('User has been Deleted');    
});

module.exports = router;