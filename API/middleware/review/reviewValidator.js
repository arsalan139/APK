let ReviewModel = require("../../model/review");
module.exports = async function (req, res, next) {
  const { error } = await ReviewModel.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  req.isValidated = true;
  next();
};
