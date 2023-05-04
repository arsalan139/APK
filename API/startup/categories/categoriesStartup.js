const categoriesRoutes = require("../../routes/api/categories/categoriesRoutes");
module.exports = function (app) {
  app.use("/api/categories", categoriesRoutes);
};
