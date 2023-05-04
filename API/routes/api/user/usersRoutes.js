var express = require("express");
const auth = require("../../../middleware/auth/auth");
const promoVerification = require("../../../middleware/promos/promoVerification");
const PromosModel = require("../../../model/promos");
const UserModel = require("../../../model/user");
var router = express.Router();

router.get("/", async (req, res) => {
  try {
    let user = await UserModel.getAllUser();
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all User!");
  }
});
/* GET users listing. */
router.get("/:id", async (req, res) => {
  try {
    let user = await UserModel.getUserById(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting User!");
  }
});
router.get("/favorites/:id", async (req, res) => {
  try {
    let user = await UserModel.getFavorite(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting User favorites!");
  }
});
/* GET users listing. */
router.post("/email", async (req, res) => {
  try {
    let user = await UserModel.getUserByEmail(req.body.email);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting User by Email!");
  }
});

router.put("/", async (req, res) => {
  try {
    const user = await UserModel.updateUser(req.body);
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error in Updating User!");
  }
});

router.put("/password", async (req, res) => {
  try {
    const user = await UserModel.changePassword(req.body);
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error in Changing Password!");
  }
});

router.put("/promoUsed/:code", promoVerification, async (req, res) => {
  try {
    let Promos = await PromosModel.promoExpired(req.params.code);
    return res.status(200).send(Promos);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error in verification Promos!");
  }
});

router.put("/addFavorite", async (req, res) => {
  try {
    const user = await UserModel.addFavorite(req.body);
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error in adding favorites!");
  }
});
router.put("/removeFavorite", async (req, res) => {
  try {
    const user = await UserModel.removeFavorite(req.body);
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error in adding favorites!");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let user = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).send("User is Deleted!");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Deleting User!");
  }
});

module.exports = router;
