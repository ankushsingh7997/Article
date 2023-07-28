const authentication2=(req,res,next)=>{
    if(req.TokenAvailable==false) return res.status(401).send({stauts:false,message:"authentication failed token required"})
    else next();

}

module.exports={authentication2}