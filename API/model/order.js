const mongoose = require('mongoose');
const Joi = require('joi');
const WorkerModel = require('./worker');
const CommissionModel = require('./commission');
const WalletModel = require('./wallet');
const UserModel = require('./user');
const Notification = require('../notifications/Notification');
const NotificationModel = require('./notification');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  worker: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  category: String,
  gender: String,
  working_hour: { type: String, default: 0 },
  status: { type: String, default: 'active' },
  amount: Number,
  description: String,
  date: { type: Date, default: new Date() },
  company_commission: Number,
  worker_status: { type: String, default: 'pending' },
  location: {
    lat: Number,
    lng: Number,
    address: String,
  },
  chat: Array,
});

OrderSchema.statics.getAllOrder = async function () {
  const Order = await OrderModel.find().populate('user').populate('worker');
  return Order;
};

OrderSchema.statics.getAllUserActiveOrder = async function (id) {
  let order = [];
  let Order = await OrderModel.find({ user: id, status: 'active' })
    .populate('user', '_id name email gender phone language favorites')
    .populate('worker', '_id name email gender phone language');
  if (Order.length > 0) {
    order.push(...Order);
  }
  Order = await OrderModel.find({ worker: id, status: 'active' })
    .populate('user', '_id name email gender phone language favorites')
    .populate('worker', '_id name email gender phone language');
  if (Order.length > 0) {
    order.push(...Order);
  }
  return order;
};

OrderSchema.statics.getOrderById = async function (id) {
  const Order = await OrderModel.findById(id)
    .populate('user', '_id name email gender phone language favorites')
    .populate('worker');
  return Order;
};

OrderSchema.statics.getMsgByOrderId = async function (id) {
  const Order = await OrderModel.findById(id);
  return Order.chat;
};

OrderSchema.statics.getOrderHistoryByUserId = async function (id) {
  let order = [];
  let Order = await OrderModel.find({
    user: id,
    status: { $nin: ['pending'] },
  })
    .populate('user', '_id name email gender phone language')
    .populate('worker', '_id name email gender phone language');
  if (Order.length > 0) {
    order.push(...Order);
  }
  Order = await OrderModel.find({ worker: id, status: { $nin: ['pending'] } })
    .populate('user', '_id name email gender phone language')
    .populate('worker', '_id name email gender phone language');
  if (Order.length > 0) {
    order.push(...Order);
  }
  return order;
};

OrderSchema.statics.getCompletedOrder = async function (id) {
  let order = [];
  let Order = await OrderModel.find({ user: id, status: 'completed' })
    .populate('user', '_id name email gender phone language')
    .populate('worker', '_id name email gender phone language');
  if (Order.length > 0) {
    order.push(...Order);
  }
  Order = await OrderModel.find({ worker: id, status: 'completed' })
    .populate('user', '_id name email gender phone language')
    .populate('worker', '_id name email gender phone language');
  if (Order.length > 0) {
    order.push(...Order);
  }
  return Order;
};

OrderSchema.methods.addOrder = async function (data) {
  // Add Order
  const commission = await CommissionModel.findById('64299d5a68c55f9a8b2c0135');
  let worker = await WorkerModel.findOne({ user: data.worker });
  const Order_Obj = new OrderModel({
    user: data.user,
    worker: data.worker,
    category: data.category,
    gender: data.gender,
    working_hour: data.working_hour,
    description: data.description,
    company_commission: commission.current,
    chat: [],
    location: data.location,
  });

  let user = await UserModel.findById(data.worker);
  let s = {
    title: 'Order',
    subtitle: 'New Order',
    body: 'An order has been created for the specified task!',
    user: user._id,
  };
  Notification([user.token], s);
  let n = new NotificationModel();
  n = await n.addNotification(s);

  const Order = await Order_Obj.save();
  return Order;
};

OrderSchema.statics.cancelOrder = async function (OrderId) {
  let Order = await OrderModel.findById(OrderId);
  Order.status = 'canceled';
  let user = await UserModel.findById(Order.worker);
  let s = {
    title: 'Order',
    subtitle: 'Cancel Order',
    body: 'An order has been canceled by user!',
    user: user._id,
  };
  Notification([user.token], s);
  let n = new NotificationModel();
  n = await n.addNotification(s);

  await Order.save();
  return 'Order has been canceled!';
};

OrderSchema.statics.rejectOrder = async function (OrderId) {
  let Order = await OrderModel.findById(OrderId);
  Order.worker_status = 'rejected';
  let user = await UserModel.findById(Order.user);
  let s = {
    title: 'Order',
    subtitle: 'Rejected Order',
    body: 'An order has been rejected by worker!',
    user: user._id,
  };
  Notification([user.token], s);
  let n = new NotificationModel();
  n = await n.addNotification(s);
  await Order.save();
  return 'Order has been rejected!';
};

OrderSchema.statics.completedOrder = async function (OrderId, payingMethod) {
  let Order = await OrderModel.findById(OrderId);

  let commission = Order.company_commission;
  let amount = Order.amount;
  amount = amount * (commission / 100);
  let worker = await WorkerModel.findOne({ user: Order.worker }).select(
    'pending_amount'
  );
  if (payingMethod === 'On Cash') {
    worker.pending_amount = worker.pending_amount + amount;
  } else {
    let wallet = await WalletModel.orderPaymentWallet(
      Order._id,
      Order.user,
      Order.amount,
      'user'
    );
    wallet = await WalletModel.orderPaymentWallet(
      Order._id,
      Order.worker,
      Order.amount - amount,
      'worker'
    );
  }

  Order.status = 'completed';
  let user = await UserModel.findById(Order.worker);
  let s = {
    title: 'Order',
    subtitle: 'Completed',
    body: 'An order has been Completed by user!',
    user: user._id,
  };
  Notification([user.token], s);
  let n = new NotificationModel();
  n = await n.addNotification(s);
  await Order.save();
  await worker.save();
  return 'Order has been completed!';
};

OrderSchema.statics.acceptedOrder = async function (OrderId, hours) {
  let Order = await OrderModel.findById(OrderId);
  Order.worker_status = 'accepted';
  console.log(Order.worker);
  let worker = await WorkerModel.findOne({ user: Order.worker });
  Order.working_hour = hours;
  console.log(hours * worker.working_rate, worker.working_rate, hours);
  Order.amount = hours * worker.working_rate;
  let user = await UserModel.findOne(Order.user);
  let s = {
    title: 'Order',
    subtitle: 'Completed',
    body: 'An order has been Accepted by worker!',
    user: user._id,
  };
  Notification([user.token], s);
  let n = new NotificationModel();
  n = await n.addNotification(s);
  await Order.save();
  return 'Order has been accepted!';
};

//Validation Functions Sign up Order info
OrderSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return validateOrder(RequestedBody);
};
//Function
function validateOrder(Order) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    user: Joi.string().required(),
    worker: Joi.string().required(),
    category: Joi.string().required(),
    gender: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.object({
      lat: Joi.number().required('Your latitude is Required'),
      lng: Joi.number().required('Your longitude is Required'),
      address: Joi.string().required('Your Address is Required'),
    }).required(),
  });

  return schema.validate(Order, { abortEarly: false });
}

OrderSchema.set('toJSON', { virtuals: true });
const OrderModel = mongoose.model('order', OrderSchema);
module.exports = OrderModel;
