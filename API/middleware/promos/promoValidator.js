let PromosModel = require("../../model/promos");
module.exports = async function (req, res, next) {
  const { error } = await PromosModel.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  req.isValidated = true;
  next();
};
