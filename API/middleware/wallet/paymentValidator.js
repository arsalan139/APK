const UserModel = require("../../model/user");
let WalletModel = require("../../model/wallet");
module.exports = async function (req, res, next) {
  let user = await UserModel.findById(req.body.worker);
  if (user.restrict) return res.status(400).send("Account got Restricted!");
  const { error } = await WalletModel.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  req.isValidated = true;
  next();
};
