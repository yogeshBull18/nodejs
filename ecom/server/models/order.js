const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
       userId = {type:String, require:true}, 
       products = [
           {
               productId:{type:string,require:true},
               qty:{type:number,require:true}
           }
       ],
       amount:{type:Number,require:true},
       address:{type:Object,require:true},
       state:{type:String,require:true},
       pincode:{type:String,require:true},
       status:{type:String,default:"pending"},
    },
    {timestamps:true},
);

module.exports = mongoose.model('Order',OrderSchema);