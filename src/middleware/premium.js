const services=require('../db/dbServiecs')
const { isValidObjectId } = require("mongoose");
const premiumCheck=async(req,res,next)=>{
const {id}=req.params
console.log(id)
if(!isValidObjectId(id)) return res.status(404).send({status:false,message:'article not found'});
const article=await services.getArticle(id);
if(!article) return res.status(404).send({status:false,message:"article not found"})
if(!article.is_premium) return res.status(200).send({status:true,data:article})
else{ 
    req.article=article
    next()}

}
 module.exports={premiumCheck}
