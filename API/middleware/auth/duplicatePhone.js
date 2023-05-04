let UserModel = require("../../model/user");
module.exports = async function (req, res, next) {
  let User = await UserModel.findOne({ phone: req.body.phone });
  if (User) {
    return res.status(400).send("This Phone has been already registered!");
  }
  req.isValidated = true;
  next();
};
