const mongoose=require('mongoose')
const objectid=mongoose.Schema.Types.ObjectId;
const commentsSchema=new mongoose.Schema({

    article_reference:{
    type:objectid,
    required:true},
    user_reference:{
        type:objectid,
        required:true
    },
    comment:{
        type:String,
        required:true
    }, 
},{timestamps:true})

module.exports=mongoose.model('comments',commentsSchema)