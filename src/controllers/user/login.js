const { jwttoken } = require("../../jwtToken/token");
const {
  checkFormat,
  isValidEmail,
  validPhone,
} = require("../../validations/validation");
const bcrypt = require("bcrypt");
const services = require("../../db/dbServiecs");

const login = async (req, res) => {
  try {
    let { emailOrNumber, password } = req.body;
    if (!emailOrNumber || !password)
      return res
        .status(400)
        .send({ status: false, message: "please fill all the fields" });
    const userDetail = { isDeleted: false };
    // check for email or number and their validation
    if (emailOrNumber.includes("@")) {
      emailOrNumber = checkFormat(emailOrNumber);
      if (!emailOrNumber)
        return res
          .status(403)
          .send({ status: false, message: "incorrect email or password" });
      emailOrNumber = emailOrNumber.toLowerCase();
      if (!isValidEmail(emailOrNumber))
        return res
          .status(403)
          .send({ status: false, message: "incorrect email or password" });

      userDetail.email = emailOrNumber;
    } else {
      let validphone = validPhone(emailOrNumber);
      if (!validphone)
        return res
          .status(400)
          .send({ status: false, message: "incorrect number or password " });
      userDetail.number = emailOrNumber;
    }

    password = checkFormat(password);
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "incorrect number/email or password" });

    let userData = await services.checkEmail(userDetail);
    if (!userData)
      return res.status(404).send({
        status: false,
        message: "no user found",
      });
    else {
      const comparePassword = bcrypt.compareSync(password, userData.password);
      if (!comparePassword)
        return res
          .status(400)
          .send({
            status: false,
            message: "incorrect number/email or password",
          });
    }

    // token creation
    const tokenObject = jwttoken(userData._id, userData.is_premium_user);
    // res.setHeader("x-api-key", tokenObject.token);

    // res.cookie('refreshToken',`${tokenObject.refreshToken}`,{maxAge:86400*7000,httpOnly:true})

    const data = {
      userId: userData._id,
      "x-api-key": tokenObject.token,
    };
    return res
      .status(200)
      .send({ status: true, message: "User login successfull", data });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { login };
