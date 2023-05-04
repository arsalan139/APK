const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const adminSchema = new mongoose.Schema({
  name: String,
  pic: { type: String, default: null },
  email: String,
  password: String,
  delete: {
    type: Boolean,
    default: true,
  },
});

adminSchema.statics.getAdminById = async function (adminId) {
  admin = await AdminModel.findById(adminId);
  let p = { ...admin };
  delete p._doc.password;
  return p._doc;
};

adminSchema.statics.getAllAdmins = async function () {
  var result = [];
  const admin = await AdminModel.find();
  admin.forEach(function (doc, err) {
    doc = { ...doc._doc };
    delete doc["password"];
    result.push(doc);
  });
  return result;
};

adminSchema.statics.getAdminByEmailPassword = async function (data) {
  const admin = await AdminModel.findOne({
    email: data.email,
    password: data.password,
  });
  let token = jwt.sign(
    {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    },
    config.get("jwtAdminKey")
  );
  return token;
};

adminSchema.methods.addAdmin = async function (data) {
  // Add admin
  const admin_Obj = new AdminModel({
    name: data.name,
    email: data.email,
    password: data.password,
  });

  const admin = await admin_Obj.save();
  return {
    _id: admin.id,
    name: admin.name,
    pic: admin.pic,
    email: admin.email,
  };
};

adminSchema.statics.updateAdmin = async function (data) {
  let admin = await AdminModel.findById(data.id);
  admin.name = data.name;
  admin.password = data.password;
  admin = await admin.save();
  delete admin["password"];
  return admin;
};

//Validation Functions Sign up admin info
adminSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return validateAdmin(RequestedBody);
};
//Function
function validateAdmin(admin) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    pic: Joi.optional(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(8).required(),
  });
  // Returniing the resuslt
  return schema.validate(admin, { abortEarly: false });
}

adminSchema.set("toJSON", { virtuals: true });
const AdminModel = mongoose.model("admin", adminSchema);
module.exports = AdminModel;
