const router = require('express').Router();
const Product = require('../models/product');
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('./verifyToken');

router.post('/add', verifyTokenAndAdmin, async (req, res)=>{ 
    
    try {

            const addProduct = await new Product({
                title :req.body.title,
                description : req.body.description,
                img :req.body.img,
                category :  req.body.category,
                size :  req.body.size,
                color :  req.body.color,
                price : req.body.price,
            });
            const product = addProduct.save();
            res.status(201).json(addProduct);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

router.get('/',verifyTokenAndAdmin, async (req, res)=>{
    const newUrlQuery = req.query.new;
    const newUrlCategories = req.query.category;
    
    try {
            let products;
           if(newUrlQuery)
           {
             products = await Product.find().sort({'_id':-1});
           }
           else if(newUrlCategories)
           {
            products = await Product.find({
                category:{
                    $in : [newUrlCategories]
                }
            });
           }
           else
           {
            products = await Product.find();       
           }      
        res.status(201).json(products);
    } catch (err) {
        res.status(501).json(err);
    }
});



router.delete('/delete/:id',verifyTokenAndAdmin, async (req, res)=>{
    try{
        const product =  await Product.findByIdAndRemove(req.params.id);
        res.status(201).json('Product Deleted');

    }
    catch(err)
    {
        res.status(501).json(err);
    }
})

module.exports = router;