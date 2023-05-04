var express = require("express");
const complaintValidator = require("../../../middleware/complaint/complaintValidator");
const ComplaintModel = require("../../../model/complaint");
var router = express.Router();

/* GET Complaints listing. */
router.get("/:id", async (req, res) => {
  try {
    let Complaint = await ComplaintModel.getComplaintById(req.params.id);
    res.status(200).send(Complaint);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting User Complaint!");
  }
});

router.post("/", complaintValidator, async (req, res) => {
  try {
    let Complaint = new ComplaintModel();
    Complaint = await Complaint.addComplaint(req.body);
    res.status(200).send(Complaint);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Adding Complaint!");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await ComplaintModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Complaint is Deleted!");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all Complaint!");
  }
});

module.exports = router;
