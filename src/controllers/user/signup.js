
const { isValidName, checkFormat, validPhone, passwordVal, isValidEmail } = require('../../validations/validation')
const bcrypt = require("bcrypt");
const services=require('../../db/dbServiecs')
const signUp=async(req,res)=>{
  try{
    let {name,email,number,password}=req.body
    const user={}

    //name validations
    name=checkFormat(name)
    if (!name)
      return res.status(400).send({ status: false, message: "please check your name" })

    if (!isValidName(name))
        return res.status(400).send({ status: false, message: "pass valid name" });
      user.name = name.toLowerCase();

      // email validations
      email=checkFormat(email)
      if (!email)
      return res.status(400).send({ status: false, message: "please check your email" })
      if (!isValidEmail(email))
      return res.status(400).send({ status: false, message: "pass valid email" });
        email = email.toLowerCase();

    // password field----------------------

    password=checkFormat(password)
    if (!password)
    return res.status(400).send({ status: false, message: "please check your password" })
    if (!passwordVal(password))
    return res.status(400).send({ status: false, message: "pass valid password  it should contain lowercase, uppercase number specialcharacter," });
    // phone check-----------------------

     let validphone=validPhone(number)
      if(!validphone) return res.status(400).send({ status: false, message: "please check your  number " })
     
       
    //hash user entered password
    user.password =  await bcrypt.hash(password, password.length);


     // check duplicate email
     let checkEmailAndnumber = await services.checkEmailAndNumber(email,number)
    
     if(!checkEmailAndnumber.status) return res.status(400).send({ status: false, message: checkEmailAndnumber.message});
     user.email=email;
     user.number=number;

     //create user
     
     let createUser = await services.createData(user);
     if(createUser.status) return res.status(400).send({ status: false, message: createUser.message });
     
     return res.status(201).send({status: true,message: "registered successfully",data: createUser,});
  }
  catch(err)
  {
    return res.status(500).send({ status: false, message: err.message });
  }

}
module.exports={signUp}