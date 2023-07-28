const jwt = require("jsonwebtoken");

function jwttoken(id, premium) {
  try {
    const token = jwt.sign(
      { id: id.toString(), premiumUser: premium },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: process.env.JWT_ACCESS_EXPIRE }
    );

    return { token };
  } catch (error) {
    console.log(error);
  }
}
module.exports = { jwttoken };
