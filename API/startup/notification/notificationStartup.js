const userAuth = require("../../middleware/auth/userAuth");
const notificationRoutes = require("../../routes/api/notification/notification");
module.exports = function (app) {
  app.use("/api/notification", userAuth, notificationRoutes);
};
