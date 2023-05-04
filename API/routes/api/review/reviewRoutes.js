var express = require("express");
const accountValidator = require("../../../middleware/accountValidator");
const reviewValidator = require("../../../middleware/review/reviewValidator");
const ReviewModel = require("../../../model/review");
var router = express.Router();

router.get("/", async (req, res) => {
  try {
    let Review = await ReviewModel.getAllReview();
    res.status(200).send(Review);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all Review!");
  }
});

/* GET Reviews listing. */
router.get("/:id", async (req, res) => {
  try {
    let Review = await ReviewModel.getReviewById(req.params.id);
    res.status(200).send(Review);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting User Review!");
  }
});

router.post("/", accountValidator, reviewValidator, async (req, res) => {
  try {
    let Review = new ReviewModel();
    Review = await Review.addReview(req.body);

    res.status(200).send(Review);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Adding Review!");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await ReviewModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Review is Deleted!");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all Review!");
  }
});

module.exports = router;
