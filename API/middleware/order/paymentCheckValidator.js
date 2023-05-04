let OrderModel = require("../../model/order");
const WalletModel = require("../../model/wallet");
module.exports = async function (req, res, next) {
  if (req.body.payment === "Jazzcash") {
    const order = await OrderModel.findById(req.params.id);
    const wallet = await WalletModel.findOne({ user: order.user });
    if (!wallet) {
      return res.status(400).send("No Wallet Found!");
    }
    console.log(wallet.current > order.amount, wallet.current, order.amount);
    if (!(wallet.current > order.amount)) {
      return res.status(400).send("Insufficient Amount in wallet!");
    }
  }

  req.isValidated = true;
  next();
};
