const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    bed:{
        type:Number,
        required:true,
    },
    bath:{
        type:Number,
        required:true,
    },
    sqft:{
        type:Number,
        required:true, 
    },
    location:{
        type:String,
        required:true
    },
    category:{
        type:String,
        lowercase:true,
        enum:['luxury','affordable']
    },
    createdAt:{
        type:Date,
        default:() => Date.now()
    },
    updatedAt:{
        type:Date,
        default:() => Date.now()
    }
})
module.exports = mongoose.model('Product',productSchema);


