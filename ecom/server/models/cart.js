const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
       userId = {type:String, require:true}, 
       products = [
           {
               productId:{type:string,require:true},
               qty:{type:number,require:true}
           }
       ]
    },
    {timestamps:true},
);

module.exports = mongoose.model('Cart',CartSchema);