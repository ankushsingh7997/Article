const jwt=require('jsonwebtoken')

const authentication=(req,res,next)=>{

    try{
        // if(!req.headers.authorization) return res.status(401).send({stauts:false,message:"authentication failed token required"})
        if(!req.headers.authorization)
        { req.TokenAvailable=false
        req.isLogin=false;
        next();
        
    
    }
     else{
        const token=req.headers.authorization.split(' ')[1];
        jwt.verify(token,process.env.JWT_ACCESS_KEY,(err,decodedToken)=>{
            if(err) return res.status(401).send({status:false,message:"authentication failed"})
            else
            {
                req.TokenAvailable=true;
                req.decodedId=decodedToken.id;
                req.isPremium=decodedToken.premiumUser;
                req.isLogin=true;
                next();
            }

        })
    }
        
        
    }
    catch(err)
    {return res.status(500).send({status:false,message:err.message})}
}
module.exports={authentication}