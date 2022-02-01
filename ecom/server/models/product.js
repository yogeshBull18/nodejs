const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        title : {require:true, unique:true,type:String},
        description : {require:true, type:String},
        img : {require:true, type:String},
        category : {require:true, type:Array},
        size : {require:true, type:String},
        color : {require:true, type:String},
        price : {require:true, type:String},
    },
    {timestamps:true}
);
module.exports = mongoose.model('product',ProductSchema);