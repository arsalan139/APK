const mongoose = require("mongoose");
const Joi = require("joi");

const CategoriesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
  name: String,
  pic: String,
});

CategoriesSchema.statics.getCategoriesById = async function (CategoriesId) {
  let Categories = await CategoriesModel.findById(CategoriesId);
  return Categories;
};

CategoriesSchema.statics.getAllCategories = async function () {
  const Categories = await CategoriesModel.find();
  return Categories;
};

CategoriesSchema.methods.addCategories = async function (data) {
  // Add Categories
  const Categories_Obj = new CategoriesModel({
    user: data.user,
    name: data.name,
    pic: data.pic,
  });

  const Categories = await Categories_Obj.save();
  return Categories;
};

CategoriesSchema.statics.updateCategories = async function (data) {
  let Categories = await CategoriesModel.findById(data.id);
  Categories.name = data.name;
  Categories.pic = data.pic;
  Categories = await Categories.save();
  return Categories;
};

//Validation Functions Sign up Categories info
CategoriesSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return validateCategories(RequestedBody);
};
//Function
function validateCategories(Categories) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    user: Joi.string().required(),
    name: Joi.string().required(),
    pic: Joi.string().required(),
  });

  return schema.validate(Categories, { abortEarly: false });
}

CategoriesSchema.set("toJSON", { virtuals: true });
const CategoriesModel = mongoose.model("categories", CategoriesSchema);
module.exports = CategoriesModel;
