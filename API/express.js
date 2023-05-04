console.clear();
var { app } = require("./server");
var path = require("path");
var config = require("config");
var mongoose = require("mongoose");
const express = require("express");

require("./startup/auth/authStartup")(app);
require("./startup/admin/adminStartup")(app);
require("./startup/language/languageStartup")(app);
require("./startup/categories/categoriesStartup")(app);
require("./startup/promos/promosStartup")(app);
require("./startup/user/userStartup")(app);
require("./startup/worker/workerStartup")(app);
require("./startup/order/orderStartup")(app);
require("./startup/wallet/walletStartup")(app);
require("./startup/complaint/complaintStartup")(app);
require("./startup/review/reviewStartup")(app);
require("./startup/commission/commissionStartup")(app);
require("./startup/notification/notificationStartup")(app);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));

module.exports = app;
