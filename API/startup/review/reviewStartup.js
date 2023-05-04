const userAuth = require("../../middleware/auth/userAuth");
const reviewRoutes = require("../../routes/api/review/reviewRoutes");
module.exports = function (app) {
  app.use("/api/review", userAuth, reviewRoutes);
};
