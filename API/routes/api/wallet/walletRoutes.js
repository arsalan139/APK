var express = require("express");
var config = require("config");
const accountValidator = require("../../../middleware/accountValidator");
const walletValidator = require("../../../middleware/wallet/paymentValidator");
const pendingDuesValidator = require("../../../middleware/wallet/pendingDuesValidator");
const WalletModel = require("../../../model/wallet");
var router = express.Router();
const stripe = require("stripe")(config.get("sk"));
router.get("/", async (req, res) => {
  try {
    let wallet = await WalletModel.getAllWallet();
    res.status(200).send(wallet);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all wallet!");
  }
});
/* GET wallets listing. */
router.get("/:id", async (req, res) => {
  try {
    let wallet = await WalletModel.getWalletById(req.params.id);
    res.status(200).send(wallet);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting User Wallet!");
  }
});

/* GET wallets listing. */
router.get("/history/:id", async (req, res) => {
  try {
    let wallet = await WalletModel.getWalletHistoryByUserId(req.params.id);
    res.status(200).send(wallet);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting User Wallet history!");
  }
});

router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.floor(amount * 0.644),
    currency: "usd",
  });

  // Send publishable key and PaymentIntent details to client
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

/* GET wallets listing. */
router.post("/", accountValidator, async (req, res) => {
  try {
    let d = {};
    if (req.query.id) {
      d = {
        user: req.query.id,
        amount: parseInt(req.body.pp_Amount) / 100,
        transaction_id: req.body.data.pp_TxnRefNo,
        method: req.body.data.pp_TxnType,
      };
    } else {
      d = req.body;
    }
    let wallet = new WalletModel();
    wallet = await wallet.addWallet(d);
    res.status(200).send(wallet);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Adding wallet!");
  }
});
router.post("/:id", async (req, res) => {
  try {
    // let wallet = new WalletModel();
    // wallet = await wallet.addWallet(req.body);
    res.status(200).send(req.params.id);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Adding wallet!");
  }
});

/* GET wallets listing. */
router.put("/payPendingDues/:id", pendingDuesValidator, async (req, res) => {
  try {
    let wallet = await WalletModel.payPendingDues(req.params.id);
    res.status(200).send(wallet);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Clear Pending Dues!");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await walletModel.findByIdAndDelete({ user: req.params.id });
    res.status(200).send("wallet is Deleted!");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all wallet!");
  }
});

module.exports = router;
