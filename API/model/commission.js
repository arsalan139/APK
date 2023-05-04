const mongoose = require("mongoose");
const Joi = require("joi");
const WorkerModel = require("./worker");

const CommissionSchema = new mongoose.Schema({
  current: Number,
  previous: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
      commission: Number,
      date: { type: Date, default: new Date() },
    },
  ],
});

CommissionSchema.statics.getCommission = async function () {
  const Commission = await CommissionModel.find().populate("user");
  return Commission[0];
};

CommissionSchema.statics.getCommissionById = async function (id) {
  const Commission = await CommissionModel.findById(id).populate("user");
  return Commission;
};

CommissionSchema.methods.addCommission = async function (data) {
  let Commission = await CommissionModel.findById("606c7fc1984a961f3c3a4420");
  if (!Commission) {
    Commission = new CommissionModel({
      current: data.amount,
      previous: [
        {
          user: data.user,
          commission: data.amount,
        },
      ],
    });
  } else {
    Commission.current = data.amount;
    Commission.previous.push({
      user: data.commission,
      commission: data.amount,
    });
  }

  Commission = await Commission.save();
  return Commission;
};

//Validation Functions Sign up Commission info
CommissionSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return validateCommission(RequestedBody);
};
//Function
function validateCommission(Commission) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    user: Joi.string().required(),
    amount: Joi.number().max(25).required(),
  });

  return schema.validate(Commission, { abortEarly: false });
}

CommissionSchema.set("toJSON", { virtuals: true });
const CommissionModel = mongoose.model("commission", CommissionSchema);
module.exports = CommissionModel;
