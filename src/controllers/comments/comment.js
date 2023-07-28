const services = require("../../db/dbServiecs");
const { isValidObjectId } = require("mongoose");
const { checkFormat } = require("../../validations/validation");

const comment = async (req, res) => {
  try {
    const { article_reference } = req.query;
    let { comment } = req.body;
    comment = checkFormat(comment);
    if (!comment)
      return res
        .status(400)
        .send({ status: false, message: "must pass comment" });
    if (!isValidObjectId(article_reference))
      return res
        .status(404)
        .send({ status: false, message: "check article_reference" });
    const article = await services.getArticle(article_reference);
    if (!article)
      return res
        .status(404)
        .send({ status: false, message: "article not found" });
    if (article.is_premium && !req.isPremium)
      return res.status(403).send({ status: false, message: "not authorized" });

    const userComment = await services.comment({
      article_reference: article_reference,
      user_reference: req.decodedId,
      comment: comment,
    });
    return res.status(201).send({ status: true, message: "comment added" });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { comment };
