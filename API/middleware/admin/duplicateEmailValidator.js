let AdminModel = require("../../model/admin");
module.exports = async function (req, res, next) {
  let admin = await AdminModel.findOne({ email: req.body.email });
  if (admin) {
    return res.status(400).send("Email has been already registered");
  }
  req.isValidated = true;
  next();
};
