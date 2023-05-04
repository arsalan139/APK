var express = require("express");
const auth = require("../../../middleware/auth/auth");
const commissionValidator = require("../../../middleware/commission/commissionValidator");
const CommissionModel = require("../../../model/commission");
var router = express.Router();

router.get("/", async (req, res) => {
  try {
    let Commission = await CommissionModel.getCommission();
    res.status(200).send(Commission);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting Commission!");
  }
});

router.post("/", commissionValidator, async (req, res) => {
  try {
    let user = new CommissionModel();
    user = await user.addCommission(req.body);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send("Error in Adding Commission!");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let Commission = await Commission.findByIdAndDelete(req.params.id);
    res.status(200).send("Commission is deleted!");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Deleting all Commission!");
  }
});

module.exports = router;
