const UserModel = require("../../model/user");
module.exports = async function (req, res, next) {
  console.log(req.body);
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email not found!");
  }
  req.isValidated = true;
  next();
};
