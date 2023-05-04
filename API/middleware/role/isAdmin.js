const jwt = require("jsonwebtoken");
const config = require("config");
const Admin = require("../../model/admin");
module.exports = async function (req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) return res.status(404).send("Token Not Provided");
  try {
    let user = jwt.verify(token, config.get("jwtAdminKey"));
    req.user = await Admin.findById(user._id);
    if (!req.user) return res.status(404).send("User Not Registered");
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }
  next();
};
