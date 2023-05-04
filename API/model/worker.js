const mongoose = require('mongoose');
const Joi = require('joi');
const UserModel = require('./user');

const WorkerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  category: String,
  pic: String,
  cnic: {
    number: String,
    front_pic: String,
    back_pic: String,
  },
  address: { place: String, lat: Number, lng: Number, city: String },
  parent_cinc: String,
  working_rate: Number,
  registration_status: { type: String, default: 'pending' },
  status: { type: String, default: 'offline' },
  pending_amount: { type: Number, default: 0 },
  review: { type: mongoose.Schema.Types.ObjectId, ref: 'review' },
});

WorkerSchema.statics.getWorkerById = async function (WorkerId) {
  let Worker = await WorkerModel.findById(WorkerId)
    .select('pic status address category cnic.number')
    .populate('user', '_id name email gender dob phone restrict ')
    .populate('review');
  return Worker;
};
WorkerSchema.statics.status = async function (id, type) {
  console.log(id, type);
  let worker = await WorkerModel.findOne({ user: id });
  worker.status = type;
  worker = await worker.save();
  // console.log(worker);
  return worker;
};

WorkerSchema.statics.getWorkerApplicationStatus = async function (WorkerId) {
  let Worker = await WorkerModel.findOne({ user: WorkerId });
  return Worker ? Worker.registration_status : 'No Application Found';
};

WorkerSchema.statics.getAllWorkerByCategory = async function (category) {
  const Worker = await WorkerModel.find({
    category,
    registration_status: 'verified',
  })
    .select('category address _id pic status working_rate ')
    .populate('user', '_id name email restrict gender phone')
    .populate('review');
  let result = [];
  for (var i in Worker) {
    if (Worker[i].review) {
      let rate = 0;
      for (var j of Worker[i].review.review) {
        rate = rate + j.rating;
      }
      Worker[i]._doc[`avgRating`] = rate / Worker[i].review.review.length;
    } else {
      Worker[i]._doc[`avgRating`] = 0;
    }
  }
  result = Worker.sort(function (a, b) {
    return b._doc.avgRating - a._doc.avgRating;
  });
  return result;
};

WorkerSchema.statics.getAllWorker = async function () {
  const Worker = await WorkerModel.find()
    .select('category pending_amount address _id working_rate')
    .populate('user', '_id name email restrict gender dob phone language')
    .populate('review');
  return Worker;
};

WorkerSchema.statics.getAllVerifiedWorker = async function () {
  const Worker = await WorkerModel.find({ registration_status: 'verified' })
    .select('category pending_amount address _id pic working_rate')
    .populate('user', '_id name email restrict gender dob phone language');
  return Worker;
};

WorkerSchema.statics.getAllWorkerPendingApplication = async function () {
  const Worker = await WorkerModel.find({
    registration_status: 'pending',
  }).populate('user', '_id name email restrict gender dob phone language');
  return Worker;
};

WorkerSchema.statics.approveWorkerPendingApplication = async function (id) {
  let Worker = await WorkerModel.findById(id);
  Worker.registration_status = 'verified';
  Worker = await Worker.save();
  return Worker;
};

WorkerSchema.methods.addWorker = async function (data) {
  // Add Worker
  console.log(data);
  const Worker_Obj = new WorkerModel({
    ...data,
    review: data.user,
  });

  let Worker = await Worker_Obj.save();
  return Worker.registration_status;
};

//Validation Functions Sign up Worker info
WorkerSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return validateWorker(RequestedBody);
};
//Function
function validateWorker(Worker) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    user: Joi.string().required('User Id is required!'),
    category: Joi.string().required(),
    pic: Joi.string().required(),
    cnic: Joi.object({
      number: Joi.string().required('Cinc Number is required'),
      front_pic: Joi.string().required('Cinc front Pic is required'),
      back_pic: Joi.string().required('Cinc back Pic is required'),
    }).required('Cinc is Required'),
    address: Joi.object({
      place: Joi.string().required('Your Address is required!'),
      lat: Joi.number().required('Your Address latitude is required!'),
      lng: Joi.number().required('Your Address longitude is required!'),
      city: Joi.string().required('City is required!'),
    }).required('Address is Required'),
    parent_cinc: Joi.string().required('Parent Cinc Number is required'),
    working_rate: Joi.number().required('Working Rate is required'),
  });

  return schema.validate(Worker, { abortEarly: false });
}

WorkerSchema.set('toJSON', { virtuals: true });
const WorkerModel = mongoose.model('Worker', WorkerSchema);
module.exports = WorkerModel;
