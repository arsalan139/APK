let OrderModel = require("../../model/order");
module.exports = async function (req, res, next) {
  const order = await OrderModel.findById(req.params.id);
  if (order.status === "canceled")
    return res.status(400).send("Order is already Cancelled!");
  if (order.status === "completed")
    return res.status(400).send("Order is Already Completed!");

  req.isValidated = true;
  next();
};
