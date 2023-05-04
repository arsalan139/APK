let LanguageModel = require("../../model/language");
module.exports = async function (req, res, next) {
  let Language = await LanguageModel.findOne({ name: req.body.name });
  if (Language) {
    return res.status(400).send("Language has been already registered");
  }
  req.isValidated = true;
  next();
};
