const config = require("config");
const express = require("express");
const nodemailer = require("nodemailer");
const client = require("twilio")(
  config.get("accountSid"),
  config.get("authToken")
);
const loginValidator = require("../../../middleware/admin/loginValidator");
const duplicatePhone = require("../../../middleware/auth/duplicatePhone");
const CodeVerification = require("../../../middleware/code/CodeVerification");
const duplicateUserEmailValidator = require("../../../middleware/user/duplicateUserEmailValidator");
const googleLogin = require("../../../middleware/user/googleLogin");
const userLoginValidator = require("../../../middleware/user/userLoginValidator");
const userValidator = require("../../../middleware/user/userValidator");
const AdminModel = require("../../../model/admin");
const CodeModel = require("../../../model/code");
const UserModel = require("../../../model/user");
var router = express.Router();
//
// Get request for returning User by login
router.post("/adminLogin", loginValidator, async (req, res) => {
  try {
    const admin = await AdminModel.getAdminByEmailPassword(req.body);
    return res.status(200).send(admin);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error from Admin login!");
  }
});

// Get request for returning User by login
router.post("/login", userLoginValidator, async (req, res) => {
  try {
    const user = await UserModel.getUserByEmailPassword(req.body);
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error from Admin login!");
  }
});

router.post("/api/login", googleLogin, async (req, res) => {
  try {
    const user = await UserModel.googleLogin(req.body);
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error from Admin Google login!");
  }
});

// Post request for adding User *checked*
router.post(
  "/signUp",
  duplicateUserEmailValidator,
  userValidator,
  async (req, res) => {
    try {
      let user = new UserModel();
      user = await user.addUser(req.body);
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send("Error in Getting User!");
    }
  }
);

// Post request for adding User *checked*
router.post("/phone-verification", duplicatePhone, async (req, res) => {
  try {
    let number = Math.floor(Math.random() * 10000);
    if (number < 1000) {
      number = number + 1000;
    }
    let user = new CodeModel();
    user = await user.addCode(number);
    let send = {
      code: 0,
      msg: "Message is sended to user",
    };
    client.messages
      .create({
        body: "your code is " + number,
        from: config.get("number"),
        to: "+92" + req.body.phone,
      })
      .done();
    res.status(200).send("Msg has been sended");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Phone verification!");
  }
});

// Post request for adding User *checked*
router.post("/code-verification", CodeVerification, async (req, res) => {
  try {
    let user = await UserModel.addPhone(req.body);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send("Error in Code Verification!");
  }
});

// Post request for adding User *checked*
router.post("/forget", async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.get("email"),
        pass: config.get("password"),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    let user = await UserModel.findOne({ email: req.body.email });
    const html = ` <div style="margin: 20px">
    <h1 style="text-align: center; font-size: 42px">Forgot Mail</h1>
    <h4>Dear Customer:</h4>
    <p style="margin-left:20px">It seem you have forget your!it heavily recommend to change your password!</p>
    <p style="margin-left:20px">email :${user.email}</p>
    <p style="margin-left:20px">Password :${user.password}</p>
  </div>`;
    console.log(req.body);
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: config.get("email"),
      to: req.body.email,
      subject: "Forgot Password",
      html,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return res.status(200).send("Email sended");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error Sending Mail!");
  }
});

module.exports = router;
