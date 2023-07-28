const getArticle = async (req, res) => {
  try {
    if (!req.isPremium)
      return res
        .status(403)
        .send({
          status: false,
          message: "not authorized choose a premium plan",
        });

    return res.status(200).send({ status: true, data: req.article });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
module.exports = { getArticle };
