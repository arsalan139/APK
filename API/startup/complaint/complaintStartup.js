const auth = require("../../middleware/auth/auth");
const userAuth = require("../../middleware/auth/userAuth");
const complaintRoutes = require("../../routes/api/complaint/complaintRoutes");
module.exports = function (app) {
  app.use("/api/complaint", userAuth, complaintRoutes);
};
