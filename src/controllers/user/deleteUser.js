const services = require("../../db/dbServiecs");

const deleteUser = async (req, res) => {
  try {
    const user = await services.updateData(req.decodedId, { isDeleted: true });
    if (!user)
      return res.status(400).send({ status: false, message: "no user found" });
    return res
      .status(200)
      .send({ status: true, message: "user deleted successfully" });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { deleteUser };
