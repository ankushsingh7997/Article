const services=require('../../db/dbServiecs')
const getAllArticles=async(req,res)=>{
    try{
const obj={}
if(!req.TokenAvailable||req.TokenAvailable&&!req.isPremium)
{
   obj.is_premium=false
}
const articles=await services.getAllArticle(obj)
return res.status(200).send({status:true,articles:articles})
    }
    catch(err)
    {
        return res.status(500).send({status:false,message:err.message})
    }


}
module.exports={getAllArticles}