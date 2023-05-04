const mongoose = require("mongoose");
const Joi = require("joi");
const WorkerModel = require("./worker");

const ComplaintSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
  category: String,
  date: { type: Date, default: new Date() },
  message: String,
});

ComplaintSchema.statics.getAllComplaint = async function () {
  const Complaint = await ComplaintModel.find()
    .populate("order")
    .populate("from", "_id name email phone")
    .populate("to", "_id name email phone");
  return Complaint;
};

ComplaintSchema.statics.getComplaintById = async function (id) {
  const Complaint = await ComplaintModel.findById(id)
    .populate("to", "_id name email phone")
    .populate("from", "_id name email phone")
    .populate("order");
  return Complaint;
};

ComplaintSchema.methods.addComplaint = async function (data) {
  // Add Complaint
  const Complaint_Obj = new ComplaintModel({
    from: data.from,
    to: data.to,
    order: data.order,
    category: data.category,
    message: data.message,
  });

  const Complaint = await Complaint_Obj.save();
  return Complaint;
};

//Validation Functions Sign up Complaint info
ComplaintSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return validateComplaint(RequestedBody);
};
//Function
function validateComplaint(Complaint) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    from: Joi.string().required(),
    to: Joi.string().required(),
    order: Joi.string().required(),
    category: Joi.string().required(),
    message: Joi.string().required(),
  });

  return schema.validate(Complaint, { abortEarly: false });
}

ComplaintSchema.set("toJSON", { virtuals: true });
const ComplaintModel = mongoose.model("complaint", ComplaintSchema);
module.exports = ComplaintModel;
