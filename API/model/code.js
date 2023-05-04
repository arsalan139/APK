const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const CodeSchema = new mongoose.Schema({
  code: Number,
});

CodeSchema.methods.addCode = async function (code) {
  // Add Code

  const Code_Obj = new CodeModel({
    code,
  });

  let Code = await Code_Obj.save();
  return Code;
};

CodeSchema.set("toJSON", { virtuals: true });
const CodeModel = mongoose.model("Code", CodeSchema);
module.exports = CodeModel;
