const userAuth = require("../../middleware/auth/userAuth");
const workerRoutes = require("../../routes/api/worker/workerRoutes");
module.exports = function (app) {
  app.use("/api/worker", userAuth, workerRoutes);
};
