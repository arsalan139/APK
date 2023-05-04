const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const WorkerModel = require("./worker");

//Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  token: String,
  gender: { type: String, default: null },
  phone: { type: String, default: null },
  pic: { type: String, default: null },
  dob: { type: Date, default: null },
  language: { type: String, default: "English" },
  restrict: { type: Boolean, default: false },
  phone_verified: { type: Boolean, default: false },
  role: Array,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

UserSchema.statics.getUserById = async function (UserId) {
  let User = await UserModel.findById(UserId);
  if (User) delete User._doc.password;
  return User._doc;
};

UserSchema.statics.getAllUser = async function () {
  var result = [];
  const User = await UserModel.find();
  User.forEach(function (doc, err) {
    doc = { ...doc._doc };
    delete doc["password"];
    result.push(doc);
  });
  return result;
};

UserSchema.statics.getUserByEmail = async function (email) {
  let user = await UserModel.findOne({
    email,
  });
  if (user) delete user._doc.password;
  return user;
};

UserSchema.statics.googleLogin = async function (data) {
  let user = await UserModel.findOne({
    email: data.email,
  });
  let token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      gender: user.gender,
    },
    config.get("jwtUserKey")
  );
  return token;
};

UserSchema.statics.getUserByEmailPassword = async function (data) {
  let user = await UserModel.findOne({
    email: data.email,
    password: data.password,
  });
  let token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      gender: user.gender,
    },
    config.get("jwtUserKey")
  );
  return token;
};

UserSchema.methods.addUser = async function (data) {
  // Add User
  const User_Obj = new UserModel({
    name: data.name,
    email: data.email,
    password: data.password,
    gender: data.gender,
    token: data.token,
    role: ["User"],
  });

  let user = await User_Obj.save();
  let token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      role: user.role,
    },
    config.get("jwtUserKey")
  );
  return token;
};

UserSchema.statics.updateUser = async function (data) {
  let User = await UserModel.findById(data._id);
  User.name = data.name;
  User.email = data.email;
  User.dob = data.dob;
  User.phone = data.phone;
  if (User.phone !== data.phone) {
    User.phone_verified = true;
  }

  User = await User.save();
  let token = jwt.sign(
    {
      id: User.id,
      name: User.name,
      email: User.email,
      gender: User.gender,
      role: User.role,
    },
    config.get("jwtUserKey")
  );
  return { msg: "Profile is updated!", token, User };
};

UserSchema.statics.addPhone = async function (data) {
  let User = await UserModel.findById(data.id);
  User.phone = data.phone;
  User.phone_verified = true;
  User = await User.save();
  delete User["password"];
  return User;
};
UserSchema.statics.changePassword = async function (data) {
  let User = await UserModel.findById(data.id);
  User.password = data.password;
  User = await User.save();
  delete User["password"];
  return User;
};

UserSchema.statics.restrictUser = async function (id) {
  let User = await UserModel.findById(id);
  User.restrict = true;
  User = await User.save();
  return "User is Restricted!";
};

UserSchema.statics.removeRestrictionUser = async function (id) {
  let User = await UserModel.findById(id);
  User.restrict = false;
  User = await User.save();
  return;
};

UserSchema.statics.getFavorite = async function (data) {
  let User = await UserModel.findById(data);
  let favorites = [];
  for (var i of User.favorites) {
    let details = await WorkerModel.findOne(
      { user: i._id },
      "category pic status address"
    ).populate("user", "restrict name email gender");
    favorites.push(details);
  }
  return favorites;
};

UserSchema.statics.addFavorite = async function (data) {
  let User = await UserModel.findById(data.id);
  console.log(User.favorites, User.favorites.includes(data.worker));
  if (User.favorites) {
    if (!User.favorites.includes(data.worker)) {
      console.log("alread");
      User.favorites.push(data.worker);
    }
  } else {
    console.log("new");
    User["favorites"] = [User.worker];
  }
  User = await User.save();
  return User;
};
UserSchema.statics.removeFavorite = async function (data) {
  console.log(data);
  let User = await UserModel.findById(data.id);
  User.favorites = User.favorites.filter((item) => item != data.worker);
  User = await User.save();
  return User;
};

//Validation Functions Sign up User info
UserSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return validateUser(RequestedBody);
};
//Function
function validateUser(User) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    gender: Joi.string().required(),
    token: Joi.string().required(),
  });

  return schema.validate(User, { abortEarly: false });
}

UserSchema.set("toJSON", { virtuals: true });
const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
