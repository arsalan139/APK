const mongoose = require("mongoose");
const Joi = require("joi");
const WorkerModel = require("./worker");

const WalletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  current: { type: Number, default: 0 },
  account: { type: String, default: "user" },
  history: Array,
});

WalletSchema.statics.getAllWallet = async function () {
  const Wallet = await WalletModel.find({ account: "user" }).populate("user");
  return Wallet;
};

WalletSchema.statics.getCompanyWallet = async function () {
  const Wallet = await WalletModel.find({ account: "company" });
  return Wallet;
};

WalletSchema.statics.getWalletById = async function (id) {
  const Wallet = await WalletModel.findOne({
    user: id,
    account: "user",
  }).populate("user", "_id name gender email dob role phone restrict");
  const pending_amount = await WorkerModel.findOne({
    user: id,
    registration_status: "verified",
  });
  if (pending_amount) {
    return {
      current: Wallet.current,
      pending_amount: pending_amount.pending_amount,
    };
  } else return Wallet;
};

WalletSchema.statics.getWalletHistoryByUserId = async function (user) {
  const Wallet = await WalletModel.find({ user, account: "user" }).populate(
    "user"
  );
  return Wallet;
};

WalletSchema.methods.addWallet = async function (data) {
  // Add Wallet
  let Wallet = await WalletModel.findOne({ user: data.user });
  if (!Wallet) {
    Wallet = new WalletModel({
      user: data.user,
      current: data.amount,
      history: [
        {
          date: new Date(),
          transaction_id: data.transaction_id,
          method: data.method,
          amount: data.amount,
          particular: "Add",
        },
      ],
    });
  } else {
    Wallet.current = Wallet.current + data.amount;
    Wallet.history.push({
      date: new Date(),
      transaction_id: data.transaction_id,
      method: data.method,
      amount: data.amount,
      particular: "Add",
    });
  }

  Wallet = await Wallet.save();
  return Wallet;
};

WalletSchema.statics.orderPaymentWallet = async function (
  id,
  user,
  amount,
  type
) {
  let Wallet = await WalletModel.findOne({ user });
  if (!Wallet) {
    if (type === "user") {
      amount = amount * -1;
    }
    Wallet = new WalletModel({
      user,
      current: amount,
      history: [
        {
          date: new Date(),
          transaction_id: id,
          method: "TWALLET",
          amount: amount,
          particular: "Add",
        },
      ],
    });
  } else {
    if (type === "user") {
      Wallet.current = Wallet.current - amount;
    } else {
      Wallet.current = Wallet.current + amount;
    }

    Wallet.history.push({
      date: new Date(),
      transaction_id: id,
      method: "Wallet",
      amount: amount,
      particular: "Order",
    });
  }

  Wallet = await Wallet.save();
  return Wallet;
};

WalletSchema.statics.payPendingDues = async function (user) {
  let worker = await WorkerModel.findOne({ user });
  let amount = worker.pending_amount;
  console.log("worker" + amount);
  let Wallet = await WalletModel.findOne({ user });
  console.log("wallet" + Wallet.current);
  let company_Wallet = await WalletModel.findOne({ account: "company" });
  Wallet.current = Wallet.current - amount;
  Wallet.history.push({
    date: new Date(),
    transaction_id: "Company-4433",
    method: "Wallet",
    amount: amount,
    particular: "Subtracted",
  });
  company_Wallet.current = company_Wallet.current + amount;
  company_Wallet.history.push({
    date: new Date(),
    transaction_id: user,
    method: "Wallet",
    amount: amount,
    particular: "Added",
  });

  worker.pending_amount = 0;
  await worker.save();
  await Wallet.save();
  await company_Wallet.save();
  return "Due have been payed!";
};

//Validation Functions Sign up Wallet info
WalletSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return validateWallet(RequestedBody);
};
//Function
function validateWallet(Wallet) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    user: Joi.string().required(),
    amount: Joi.number().required(),
    transaction_id: Joi.string().required(),
    method: Joi.string().required(),
  });

  return schema.validate(Wallet, { abortEarly: false });
}

WalletSchema.set("toJSON", { virtuals: true });
const WalletModel = mongoose.model("wallet", WalletSchema);
module.exports = WalletModel;
