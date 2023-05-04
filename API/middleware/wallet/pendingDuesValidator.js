let WalletModel = require("../../model/wallet");
let moment = require("moment");
const WorkerModel = require("../../model/worker");
module.exports = async function (req, res, next) {
  const Wallet = await WalletModel.findOne({ user: req.params.id });
  const Worker = await WorkerModel.findOne({ user: req.params.id });
  if (Wallet.current < Worker.pending_amount)
    return res
      .status(400)
      .send("Dues Cannot be Payed due to low amount in wallet!");
  req.isValidated = true;
  next();
};
