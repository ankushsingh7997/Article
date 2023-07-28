const {
  isValidName,
  checkFormat,
  validPhone,
  passwordVal,
  isValidEmail,
} = require("../../validations/validation");
const bcrypt = require("bcrypt");
const services = require("../../db/dbServiecs");

const editUser = async (req, res) => {
  try {
    let { name, email, number, password } = req.body;
    if (!name && !email && !number && !password)
      return res
        .status(400)
        .send({ status: false, message: "please pass some data to update" });
    const user = {};
    // name
    if (name) {
      name = checkFormat(name);
      if (!name)
        return res
          .status(400)
          .send({ status: false, message: "please check your name" });

      if (!isValidName(name))
        return res
          .status(400)
          .send({ status: false, message: "pass valid name" });
      user.name = name.toLowerCase();
    }
    //email
    if (email) {
      email = checkFormat(email);
      if (!email)
        return res
          .status(400)
          .send({ status: false, message: "please check your email" });
      if (!isValidEmail(email))
        return res
          .status(400)
          .send({ status: false, message: "pass valid email" });
      email = email.toLowerCase();
    }
    // password
    if (password) {
      password = checkFormat(password);
      if (!password)
        return res
          .status(400)
          .send({ status: false, message: "please check your password" });
      if (!passwordVal(password))
        return res
          .status(400)
          .send({
            status: false,
            message:
              "pass valid password  it should contain lowercase, uppercase number specialcharacter,",
          });

      user.password = await bcrypt.hash(password, password.length);
    }
    // number
    if (number) {
      let validphone = validPhone(number);
      if (!validphone)
        return res
          .status(400)
          .send({ status: false, message: "please check your  number " });
    }
    // password and number duplicacy
    if (number || email) {
      let checkEmailAndnumber = await services.checkEmailAndNumber(
        email,
        number
      );

      if (!checkEmailAndnumber.status)
        return res
          .status(400)
          .send({ status: false, message: checkEmailAndnumber.message });
      if (email) user.email = email;
      if (number) user.number = number;
    }

    const update = await services.updateData(req.decodedId, user);
    if (!update)
      return res.status(400).send({ statu: false, message: "no user found" });

    return res
      .status(200)
      .send({ statu: true, message: "data updated seccessfully" });
  } catch (err) {
    return res.status(500).send({ statu: false, message: err.message });
  }
};
module.exports = { editUser };
