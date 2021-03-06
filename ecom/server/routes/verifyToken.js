const jwt = require('jsonwebtoken');

const verifyToken =  (req, res, next)=>{
    const autHeader = req.headers.token;
     if(autHeader)
     {
        const token = autHeader.split(" ")[1]; 

        jwt.verify(token,process.env.JWT_SEC, (err, user)=>{
            if(err) res.status('401').json('Token Not valid');
            req.user = user;
            // res.status('300').json(user);
            next();
        });
     }
     else
     {
        return res.status('401').json('You are not authenticated');
     }

}
const verifyTokenAndAuthorization = (req, res, next)=> {
    verifyToken(req, res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin)
        {
            next();
        }
        else
        {
            res.status('401').json('You are not allowed to do that.')
        }
    });
}
const verifyTokenAndAdmin = (req, res, next)=>
{
    verifyToken(req, res,()=>{
        if(req.user.isAdmin)
        {
            next();
        }
        else
        {
            res.status('401').json('You are not allowed to do that.')
        }
    });
}
module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin};