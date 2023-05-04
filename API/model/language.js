const mongoose = require("mongoose");
const Joi = require("joi");

const LanguageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
  name: String,
  terms: {},
});

LanguageSchema.statics.getLanguageById = async function (LanguageId) {
  let Language = await LanguageModel.findById(LanguageId);
  return Language;
};

LanguageSchema.statics.getAllLanguage = async function () {
  const Language = await LanguageModel.find();
  return Language;
};

LanguageSchema.methods.addLanguage = async function (data) {
  // Add Language
  const Language_Obj = new LanguageModel({
    user: data.user,
    name: data.name,
    terms: data.terms,
  });

  const Language = await Language_Obj.save();
  return Language;
};

//Validation Functions Sign up Language info
LanguageSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return validateLanguage(RequestedBody);
};
//Function
function validateLanguage(Language) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    user: Joi.string().required(),
    name: Joi.string().required(),
    terms: Joi.object({
      home: Joi.object({
        title: Joi.string().required("Category is required"),
        subheading: Joi.string().required("Total Category is required"),
      }),
      selected_category: Joi.object({
        order: Joi.string().required("Place Order is required"),
      }),
      drawer: Joi.object({
        home: Joi.string().required("Home is required"),
        language: Joi.string().required("Language is required"),
        application: Joi.string().required("Are You A worker? is required"),
        profile: Joi.string().required("Profile is required"),
        sign_out: Joi.string().required("Sign out is required"),
      }),
      language: Joi.object({
        title: Joi.string().required("Language is required"),
        subheading: Joi.string().required("List of Languages is required"),
      }),
      application: Joi.object({
        title: Joi.string().required("Application is required"),
        category: Joi.string().required("Select a Category is required"),
        upload_image: Joi.string().required("Upload Image is required"),
        upload_cnic_front: Joi.string().required(
          "Upload Cnic Front Side is required"
        ),
        upload_cnic_back: Joi.string().required(
          "Upload Cnic Back Side is required"
        ),
        cnic_number: Joi.string().required("Cnic Number is required"),
        parent_cinc: Joi.string().required("Parent Cnic Number is required"),
        address: Joi.string().required("Address is required"),
        submit_form: Joi.string().required("Submit Form is required"),
        city: Joi.string().required("City Form is required"),
        working_rate: Joi.string().required("Working_ Rate Form is required"),
      }),
      profile: Joi.object({
        placed_task: Joi.string().required("Placed Task is required"),
        assigned_task: Joi.string().required("Assigned Task is required"),
        wallet: Joi.string().required("Wallet is required"),
        history: Joi.string().required("History is required"),
        reviews: Joi.string().required("Reviews is required"),
        online_training: Joi.string().required("Online Training is required"),
        notification: Joi.string().required("Notifications is required"),
        setting: Joi.string().required("Setting is required"),
        sign_out: Joi.string().required("Sign out is required"),
        promo: Joi.string().required("Promo is required"),
        favorites: Joi.string().required("Favorites is required"),
      }),
      placedTask: Joi.object({
        title: Joi.string().required("Placed Task is required"),
        my_task: Joi.string().required("My Task is required"),
        assigned_task: Joi.string().required("Assigned Task is required"),
        view_details: Joi.string().required("View Details is required"),
        accept: Joi.string().required("Accept is required"),
        reject: Joi.string().required("Reject is required"),
        cancel: Joi.string().required("Cancel is required"),
        price: Joi.string().required("Price is required"),
        hours: Joi.string().required("Hours is required"),
      }),
      task_details: Joi.object({
        title: Joi.string().required("Order Details is required"),
        subheading: Joi.string().required("Order is required"),
        order_from: Joi.string().required("Order From is required"),
        order_to: Joi.string().required("Order To is required"),
        phone: Joi.string().required("Phone is required"),
        gender: Joi.string().required("Gender is required"),
        chat: Joi.string().required("Chat is required"),
        complain: Joi.string().required("Complain is required"),
        price: Joi.string().required("Price is required"),
        hours: Joi.string().required("Hours is required"),
        status: Joi.string().required("Status is required"),
        worker_status: Joi.string().required("Worker Status is required"),
        commission: Joi.string().required("Commission is required"),
        address: Joi.string().required("Address is required"),
        description: Joi.string().required("Description is required"),
        completed: Joi.string().required("Completed is required"),
      }),
      promo: Joi.object({
        title: Joi.string().required("Title is required"),
        expires: Joi.string().required("Expires At is required"),
        status: Joi.string().required("Status is required"),
        used: Joi.string().required("Used is required"),
        not_used: Joi.string().required("Not Used is required"),
        expired: Joi.string().required("Expired is required"),
        not_expired: Joi.string().required("Not Expired is required"),
      }),
      complaint: Joi.object({
        title: Joi.string().required("Complaint Box is required"),
        subheading: Joi.string().required("Order is required"),
        complaint_to: Joi.string().required("Complaint To is required"),
        phone: Joi.string().required("Phone is required"),
        gender: Joi.string().required("Gender is required"),
        submit: Joi.string().required("Submit is required"),
      }),
      wallet: Joi.object({
        title: Joi.string().required("Wallet is required"),
        current_wallet: Joi.string().required("Current Wallet is required"),
        add_wallet: Joi.string().required("Add Wallet is required"),
        pending_amount: Joi.string().required("Pending Amount is required"),
        amount: Joi.string().required("Amount is required"),
        pay: Joi.string().required("Pay is required"),
      }),
      add_wallet: Joi.object({
        title: Joi.string().required("Add Wallet is required"),
        amount: Joi.string().required("Amount is required"),
        add: Joi.string().required("Add is required"),
      }),
      history: Joi.object({
        title: Joi.string().required("History is required"),
        my_task: Joi.string().required("My Task is required"),
        assigned_task: Joi.string().required("Assigned Task is required"),
        view_details: Joi.string().required("View Details is required"),
        price: Joi.string().required("Price is required"),
        hours: Joi.string().required("Hours is required"),
      }),
      reviews: Joi.object({
        title: Joi.string().required("Reviews is required"),
      }),
      online_training: Joi.object({
        title: Joi.string().required("Online Training is required"),
      }),
      notification: Joi.object({
        title: Joi.string().required("Notification is required"),
      }),
      setting: Joi.object({
        title: Joi.string().required("Setting is required"),
        subheading: Joi.string().required("Information is required"),
        name: Joi.string().required("Name is required"),
        email: Joi.string().required("Email is required"),
        phone: Joi.string().required("Phone is required"),
        verify: Joi.string().required("Verify is required"),
        dob: Joi.string().required("Date of Birth is required"),
        update_profile: Joi.string().required("Update Profile is required"),
        new_password: Joi.string().required("New Password is required"),
        confirm_password: Joi.string().required("Confirm Password is required"),
        change_password: Joi.string().required("Change Password is required"),
      }),
      add_order: Joi.object({
        title: Joi.string().required("Add Order is required"),
        subheading: Joi.string().required("Order To is required"),
        gender: Joi.string().required("Gender is required"),
        male: Joi.string().required("Male is required"),
        female: Joi.string().required("Female is required"),
        price: Joi.string().required("Price is required"),
        working_hour: Joi.string().required("Worker Hour is required"),
        address: Joi.string().required("Address is required"),
        place_order: Joi.string().required("Place the Order is required"),
      }),
    }),
  });

  return schema.validate(Language, { abortEarly: false });
}

LanguageSchema.set("toJSON", { virtuals: true });
const LanguageModel = mongoose.model("language", LanguageSchema);
module.exports = LanguageModel;
