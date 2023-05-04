let UserModel = require("../../model/user");
module.exports = async function (req, res, next) {
  const { error } = await UserModel.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  req.isValidated = true;
  next();
};
