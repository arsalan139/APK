const AuthRouter = require("../../routes/api/auth/authRoutes");
module.exports = function (app) {
  app.use("/api/auth", AuthRouter);
};
