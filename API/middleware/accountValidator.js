const UserModel = require("../model/user");
module.exports = async function (req, res, next) {
  let user = "";
  if (req.query.id) {
    user = req.query.id;
  } else {
    user = req.body.user;
  }
  user = await UserModel.findById(user);
  if (user.restrict) return res.status(400).send("Your Account is Restricted!");
  if (!user.phone_verified)
    return res.status(400).send("Your Phone Number is Not Verified!");

  req.isValidated = true;
  next();
};
