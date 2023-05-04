const UserModel = require("../../model/user");
module.exports = async function (req, res, next) {
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user.phone_verified) {
    return res.status(400).send("Phone number is not verified!");
  }

  req.isValidated = true;
  next();
};
