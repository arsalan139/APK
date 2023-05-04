let OrderModel = require("../../model/order");
let moment = require("moment");
module.exports = async function (req, res, next) {
  const order = await OrderModel.findById(req.params.id);
  let a = moment(order.date);
  let b = moment(new Date());
  console.log(b.diff(a, "second"), a.diff(b, "second"));
  if (b.diff(a, "second") > 60)
    return res
      .status(400)
      .send("Order cannot be Cancelled! Time limit exceeded.");
  req.isValidated = true;
  next();
};
