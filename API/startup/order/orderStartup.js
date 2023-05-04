const userAuth = require("../../middleware/auth/userAuth");
const orderRoutes = require("../../routes/api/order/orderRoutes");
module.exports = function (app) {
  app.use("/api/order", userAuth, orderRoutes);
};
