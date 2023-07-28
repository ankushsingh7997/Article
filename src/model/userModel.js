const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:4,
        max:20,
        
    },
    password:{
        type:String,
        require:true,
        min:6

    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    is_premium_user:{
        type:Boolean,
        default:false
    },number:{
        type:Number,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }


},{timestamps:true})

module.exports=mongoose.model('user',userSchema)