const express = require("express");
const router = express.Router();
const promoValidator = require("../../../middleware/promos/promoValidator");
const PromosModel = require("../../../model/promos");

router.get("/", async (req, res) => {
  try {
    let Promos = await PromosModel.getAllPromos();
    return res.status(200).send(Promos);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error in Getting All Promos!");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let Promos = await PromosModel.getPromosById(req.params.id);
    return res.status(200).send(Promos);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error in Getting All Promos!");
  }
});

router.post("/", promoValidator, async (req, res) => {
  try {
    let Promos = new PromosModel();
    Promos = await Promos.addPromos(req.body);
    return res.status(200).send(Promos);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error in Adding Promos!");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await PromosModel.findByIdAndDelete(req.params.id);
    return res.status(200).send("Promo is Deleted Successfully!");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error Deleting Promos!");
  }
});

module.exports = router;
