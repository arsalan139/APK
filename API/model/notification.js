const mongoose = require("mongoose");
const Joi = require("joi");

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  notification: Array,
});

notificationSchema.statics.getNotificationById = async function (
  notificationId
) {
  console.log(notificationId);
  let notification = await NotificationModel.findOne({ user: notificationId });
  return notification;
};

notificationSchema.statics.getAllNotification = async function () {
  const notification = await NotificationModel.find();
  return notification;
};

notificationSchema.methods.addNotification = async function (data) {
  // Add notification
  let notification = await NotificationModel.findOne({ user: data.user });
  if (!notification) {
    notification = new NotificationModel({
      user: data.user,
      notification: [
        {
          title: data.title,
          body: data.body,
          subtitle: data.subtitle,
        },
      ],
    });
  } else {
    notification.notification.push({
      title: data.title,
      body: data.body,
      subtitle: data.subtitle,
    });

    notification = await notification.save();
    return notification;
  }

  notification = await notification.save();
  return notification;
};

//Validation Functions Sign up notification info
notificationSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return validateNotification(RequestedBody);
};
//Function
function validateNotification(notification) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    user: Joi.string().required(),
    title: Joi.string().required(),
    body: Joi.date().required(),
    subtitle: Joi.number().required(),
  });

  return schema.validate(notification, { abortEarly: false });
}

notificationSchema.set("toJSON", { virtuals: true });
const NotificationModel = mongoose.model("notification", notificationSchema);
module.exports = NotificationModel;
