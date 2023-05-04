const express = require("express");
const router = express.Router();

const NotificationModel = require("../../../model/notification");

router.get("/", async (req, res) => {
  try {
    let Notification = await NotificationModel.getAllNotification();
    return res.status(200).send(Notification);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error in Getting All Notification!");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let Notification = await NotificationModel.getNotificationById(
      req.params.id
    );
    return res.status(200).send(Notification);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error in Getting All Notification!");
  }
});

router.post("/", async (req, res) => {
  try {
    let Notification = new NotificationModel();
    Notification = await Notification.addNotification(req.body);
    return res.status(200).send(Notification);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error in Adding Notification!");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await NotificationModel.findByIdAndDelete(req.params.id);
    return res.status(200).send("Promo is Deleted Successfully!");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error Deleting Notification!");
  }
});

module.exports = router;
