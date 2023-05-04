const mongoose = require("mongoose");
const Joi = require("joi");

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  _id: { type: mongoose.Schema.Types.ObjectId },
  review: Array,
});

ReviewSchema.statics.getAllReview = async function () {
  const Review = await ReviewModel.find().populate("user");
  return Review;
};

ReviewSchema.statics.getReviewById = async function (id) {
  const Review = await ReviewModel.findById(id).populate(
    "user",
    "name _id gender dob restrict language"
  );
  return Review;
};

ReviewSchema.methods.addReview = async function (data) {
  let Review = await ReviewModel.findById(data.user);
  if (!Review) {
    Review = new ReviewModel({
      user: data.user,
      _id: data.user,
      review: [
        {
          name: data.name,
          rating: data.rating,
          id: data.id,
          date: new Date(),
          msg: data.msg,
          gender: data.gender,
        },
      ],
    });
  } else {
    Review.review.push({
      name: data.name,
      rating: data.rating,
      id: data.id,
      date: new Date(),
      msg: data.msg,
      gender: data.gender,
    });
  }

  Review = await Review.save();
  return Review;
};

//Validation Functions Sign up Review info
ReviewSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return validateReview(RequestedBody);
};
//Function
function validateReview(Review) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    user: Joi.string().required(),
    name: Joi.string().required(),
    id: Joi.string().required(),
    rating: Joi.number().required(),
    msg: Joi.string().required(),
    gender: Joi.string().required(),
  });

  return schema.validate(Review, { abortEarly: false });
}

ReviewSchema.set("toJSON", { virtuals: true });
const ReviewModel = mongoose.model("review", ReviewSchema);
module.exports = ReviewModel;
