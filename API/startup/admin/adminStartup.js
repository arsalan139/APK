const auth = require("../../middleware/auth/auth");
const adminRoutes = require("../../routes/api/admin/adminRoutes");
module.exports = function (app) {
  app.use("/api/admin", adminRoutes);
};
