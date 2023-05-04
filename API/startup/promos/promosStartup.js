const auth = require("../../middleware/auth/auth");
const promosRoutes = require("../../routes/api/promos/promosRoutes");
module.exports = function (app) {
  app.use("/api/promos", promosRoutes);
};
