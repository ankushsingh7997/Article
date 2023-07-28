const { checkFormat } = require("../../validations/validation")
const services=require('../../db/dbServiecs')

const createArticle=async(req,res)=>{
    try{
    let{title,content}=req.body
   
    title=checkFormat(title)
    if (!title)
      return res.status(400).send({ status: false, message: "title is a mendatory field" })

      content=checkFormat(content)
      if (!content)
        return res.status(400).send({ status: false, message: "content is mendatory" })

        const createContent = await services.createArticle({title:title,content:content,is_premium:req.isPremium});
        if(createContent.status) return res.status(400).send({ status: false, message: createContent.message });
        
        return res.status(201).send({status: true,message: "content uploaded",data: createContent,});

    }
    catch(err)
    {
        return res.status(500).send({status:false,message:err.message})
    }




}
module.exports={createArticle}