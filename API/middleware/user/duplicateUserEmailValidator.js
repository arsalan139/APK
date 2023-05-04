let UserModel = require("../../model/user");
module.exports = async function (req, res, next) {
  let User = await UserModel.findOne({ email: req.body.email });
  if (User) {
    return res.status(400).send("User Email has been already registered!");
  }
  req.isValidated = true;
  next();
};
