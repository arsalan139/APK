const express = require("express");
const auth = require("../../../middleware/auth/auth");
const duplicateLanguageValidator = require("../../../middleware/language/duplicateLanguageValidator");
const languageValidator = require("../../../middleware/language/languageValidator");
const router = express.Router();
const LanguageModel = require("../../../model/language");

router.get("/", async (req, res) => {
  try {
    let Language = await LanguageModel.getAllLanguage();
    return res.status(200).send(Language);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error in Getting All Language!");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let Language = await LanguageModel.getLanguageById(req.params.id);
    return res.status(200).send(Language);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error in Getting Language!");
  }
});

router.post(
  "/",
  auth,
  duplicateLanguageValidator,
  languageValidator,
  async (req, res) => {
    try {
      let Language = new LanguageModel();
      await Language.addLanguage(req.body);
      Language = await LanguageModel.getAllLanguage();
      return res.status(200).send(Language);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Error in Adding Language!");
    }
  }
);

router.delete("/:id", auth, async (req, res) => {
  try {
    await LanguageModel.findByIdAndDelete(req.params.id);
    let Language = await LanguageModel.getAllLanguage();
    return res.status(200).send(Language);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error Deleting Language!");
  }
});

module.exports = router;
