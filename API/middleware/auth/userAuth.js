const jwt = require("jsonwebtoken");
const config = require("config");
const UserModel = require("../../model/user");
module.exports = async function (req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) return res.status(404).send("Token Not Provided");
  try {
    let user = jwt.verify(token, config.get("jwtUserKey"));
    user = await UserModel.findById(user.id);
    if (!user) return res.status(404).send("You are not Authorized!");
  } catch (err) {
    // console.log(err);
    return res.status(400).send("Invalid Token");
  }
  next();
};
