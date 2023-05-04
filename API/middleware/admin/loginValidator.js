const AdminModel = require("../../model/admin");
module.exports = async function (req, res, next) {
  console.log(req.body);
  let user = await AdminModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email not found!");
  } else if (user.password !== req.body.password) {
    return res.status(400).send("Your password is incorrect");
  }

  req.isValidated = true;
  next();
};
