const userAuth = require("../../middleware/auth/userAuth");
const userRoutes = require("../../routes/api/user/usersRoutes");
module.exports = function (app) {
  app.use("/api/user", userAuth, userRoutes);
};
