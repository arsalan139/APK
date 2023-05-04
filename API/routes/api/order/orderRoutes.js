var express = require("express");
const accountValidator = require("../../../middleware/accountValidator");
const orderCancelValidator = require("../../../middleware/order/orderCancelValidator");
const orderStatusCheck = require("../../../middleware/order/orderStatusCheck");
const orderValidator = require("../../../middleware/order/orderValidator");
const orderWorkerStatus = require("../../../middleware/order/orderWorkerStatus");
const paymentCheckValidator = require("../../../middleware/order/paymentCheckValidator");
const OrderModel = require("../../../model/order");
var router = express.Router();

router.get("/", async (req, res) => {
  try {
    let Order = await OrderModel.getAllOrder();
    res.status(200).send(Order);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all Order!");
  }
});

router.get("/active/:id", async (req, res) => {
  try {
    let Order = await OrderModel.getAllUserActiveOrder(req.params.id);
    res.status(200).send(Order);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all Order!");
  }
});
/* GET Orders listing. */
router.get("/msg/:id", async (req, res) => {
  try {
    let Order = await OrderModel.getMsgByOrderId(req.params.id);
    res.status(200).send(Order);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting Order!");
  }
});
/* GET Orders listing. */
router.get("/:id", async (req, res) => {
  try {
    let Order = await OrderModel.getOrderById(req.params.id);
    res.status(200).send(Order);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting Order!");
  }
});

/* GET Orders listing. */
router.get("/history/:id", async (req, res) => {
  try {
    let Order = await OrderModel.getOrderHistoryByUserId(req.params.id);
    res.status(200).send(Order);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting Order History!");
  }
});
/* GET Orders listing. */
router.post("/", accountValidator, orderValidator, async (req, res) => {
  try {
    console.log(req.body);
    let Order = new OrderModel();
    Order = await Order.addOrder(req.body);
    res.status(200).send(Order);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Adding Order!");
  }
});

/* GET Orders listing. */
router.put(
  "/cancel/:id",
  orderStatusCheck,
  orderCancelValidator,
  async (req, res) => {
    try {
      let Order = await OrderModel.cancelOrder(req.params.id);
      res.status(200).send(Order);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error in Canceling Order!");
    }
  }
);

/* GET Orders listing. */
router.put(
  "/completed/:id",
  orderStatusCheck,
  paymentCheckValidator,
  async (req, res) => {
    try {
      let Order = await OrderModel.completedOrder(
        req.params.id,
        req.body.payment
      );
      res.status(200).send(Order);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error in completing Order!");
    }
  }
);

/* GET Orders listing. */
router.put(
  "/accepted/:id",
  orderStatusCheck,
  orderWorkerStatus,
  async (req, res) => {
    try {
      let Order = await OrderModel.acceptedOrder(req.params.id, req.body.hours);
      res.status(200).send(Order);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error in accepting Order!");
    }
  }
);

/* GET Orders listing. */
router.put(
  "/rejected/:id",
  orderStatusCheck,
  orderWorkerStatus,
  async (req, res) => {
    try {
      let Order = await OrderModel.rejectOrder(req.params.id);
      res.status(200).send(Order);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error in accepting Order!");
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    await OrderModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Order is Deleted!");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all Order!");
  }
});

module.exports = router;
