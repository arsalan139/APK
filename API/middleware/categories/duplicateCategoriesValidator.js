let CategoriesModel = require("../../model/categories");
module.exports = async function (req, res, next) {
  let Categories = await CategoriesModel.findOne({ name: req.body.name });
  if (Categories) {
    return res.status(400).send("Categories has been already registered");
  }
  req.isValidated = true;
  next();
};
