let OrderModel = require("../../model/order");
module.exports = async function (req, res, next) {
  const order = await OrderModel.findById(req.params.id);
  if (order.worker_status === "accepted")
    return res.status(400).send("Order is Already accepted!");
  if (order.worker_status === "rejected")
    return res.status(400).send("Order is Already rejected!");

  req.isValidated = true;
  next();
};
