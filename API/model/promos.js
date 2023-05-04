const mongoose = require("mongoose");
const Joi = require("joi");
const UserModel = require("./user");
const Notification = require("../notifications/Notification");
const NotificationModel = require("./notification");
const WalletModel = require("./wallet");

const promosSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  code: String,
  endDate: Date,
  amount: Number,
  used: { type: Boolean, default: false },
  startDate: { type: Date, default: new Date() },
});

promosSchema.statics.getPromosById = async function (promosId) {
  let promos = await PromosModel.find({ user: promosId });
  return promos;
};

promosSchema.statics.getAllPromos = async function () {
  const promos = await PromosModel.find();
  return promos;
};

promosSchema.methods.addPromos = async function (data) {
  // Add promos
  const promos_Obj = new PromosModel({
    user: data.user,
    code: data.code,
    endDate: data.endDate,
    amount: data.amount,
  });
  let user = await UserModel.findById(data.user);
  let s = {
    title: "Promo",
    subtitle: "Your New Promo",
    body: `New Promo has been given to you, with code${data.code} against ${data.amount} amount`,
    user: user._id,
  };
  Notification([user.token], s);
  let n = new NotificationModel();
  n = await n.addNotification(s);

  const promos = await promos_Obj.save();
  return promos;
};

promosSchema.statics.promoExpired = async function (promosId) {
  let promos = await PromosModel.findOne({ code: promosId });
  promos.used = true;
  let wallet = await WalletModel.findOne({ user: promos.user });
  wallet.current = wallet.current + promos.amount;
  wallet.history.push({
    date: new Date(),
    transaction_id: promos.user,
    method: "Promo",
    amount: promos.amount,
    particular: "Added",
  });
  await wallet.save();
  await promos.save();
  return promos;
};

//Validation Functions Sign up promos info
promosSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return validatePromos(RequestedBody);
};
//Function
function validatePromos(promos) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    user: Joi.string().required(),
    code: Joi.string().required(),
    endDate: Joi.date().required(),
    amount: Joi.number().required(),
  });

  return schema.validate(promos, { abortEarly: false });
}

promosSchema.set("toJSON", { virtuals: true });
const PromosModel = mongoose.model("promo", promosSchema);
module.exports = PromosModel;
