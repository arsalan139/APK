const UserModel = require("../../model/user");
let WorkerModel = require("../../model/worker");
module.exports = async function (req, res, next) {
  let user = await UserModel.findById(req.body.user);
  if (!user) return res.status(400).send("Your are not allowed to join!");
  if (!user.dob) return res.status(400).send("Your date of Birth is Missing!");
  if (!user.phone_verified)
    return res.status(400).send("Your Phone Number is Not Verified!");
  user = await WorkerModel.findOne({ user: req.body.user });
  if (user?.registration_status === "pending")
    return res.status(400).send("Your Request is in for Approval!");
  if (user) return res.status(400).send("Your are already join!");
  const { error } = await WorkerModel.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  req.isValidated = true;
  next();
};
