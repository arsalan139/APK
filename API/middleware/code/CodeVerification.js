const CodeModel = require("../../model/code");
module.exports = async function (req, res, next) {
  console.log(req.body);
  let Code = await CodeModel.findOne({
    code: req.body.code,
  });
  if (!Code) {
    return res.status(400).send("Invalid code!");
  }

  req.isValidated = true;
  next();
};
