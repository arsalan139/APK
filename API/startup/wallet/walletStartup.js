const userAuth = require("../../middleware/auth/userAuth");
const walletRoutes = require("../../routes/api/wallet/walletRoutes");
module.exports = function (app) {
  app.use("/api/wallet", userAuth, walletRoutes);
};
