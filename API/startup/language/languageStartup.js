const auth = require("../../middleware/auth/auth");
const languageRoutes = require("../../routes/api/language/languageRoutes");
module.exports = function (app) {
  app.use("/api/language", languageRoutes);
};
