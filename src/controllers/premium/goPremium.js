const services = require("../../db/dbServiecs");

const goPremium=async(req,res)=>{
    try{
    if(req.isPremium) return res.status(400).send({message:"already a premium user"})
    await services.updateData(req.decodedId,{is_premium_user:true})
    return res.status(200).send({status:true,message:"you are now a premium user"})
    }
    catch(err)
    {
        return res.status(500).send({status:false,message:err})
    }
    
}
module.exports={goPremium}