const express = require("express");
const router = express.Router();
const adminValidator = require("../../../middleware/admin/adminValidator");
const duplicateEmailValidator = require("../../../middleware/admin/duplicateEmailValidator");
const AdminModel = require("../../../model/admin");
const UserModel = require("../../../model/user");
const nodemailer = require("nodemailer");
var config = require("config");
const pdfMake = require("pdfmake/build/pdfmake");
const vfsFonts = require("pdfmake/build/vfs_fonts");
const CategoriesModel = require("../../../model/categories");
const WorkerModel = require("../../../model/worker");
const WalletModel = require("../../../model/wallet");
const OrderModel = require("../../../model/order");
const ComplaintModel = require("../../../model/complaint");
const NotificationModel = require("../../../model/notification");
const Notification = require("../../../notifications/Notification");
pdfMake.vfs = vfsFonts.pdfMake.vfs;

router.get("/", async (req, res) => {
  try {
    let admin = await AdminModel.getAllAdmins();
    return res.status(200).send(admin);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error Adding Admin!");
  }
});

router.get("/userList", async (req, res) => {
  try {
    let user = await UserModel.getAllUser();
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all User!");
  }
});

router.get("/workerList", async (req, res) => {
  try {
    let worker = await WorkerModel.getAllVerifiedWorker();
    res.status(200).send(worker);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all worker!");
  }
});

router.post("/userEmail", async (req, res) => {
  try {
    let user = await UserModel.getUserByEmail(req.body.email);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting User by Email!");
  }
});

router.get("/pendingApplication", async (req, res) => {
  try {
    let worker = await WorkerModel.getAllWorkerPendingApplication();
    res.status(200).send(worker);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error Adding Admin!");
  }
});

router.get("/companyWallet", async (req, res) => {
  try {
    let wallet = await WalletModel.getCompanyWallet();
    res.status(200).send(wallet);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting Company wallet!");
  }
});

router.get("/complaints", async (req, res) => {
  try {
    let Complaint = await ComplaintModel.getAllComplaint();
    res.status(200).send(Complaint);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all Complaint!");
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    let pending = await WorkerModel.find({
      registration_status: "pending",
    }).countDocuments();
    let verified = await WorkerModel.find({
      registration_status: "verified",
    }).countDocuments();
    let order_completed = await OrderModel.find({
      status: "completed",
    }).countDocuments();
    res.status(200).send({ pending, verified, order_completed });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error Getting Dashboard!");
  }
});

router.put("/verified/:id", async (req, res) => {
  try {
    let worker = await WorkerModel.approveWorkerPendingApplication(
      req.params.id
    );
    let user = await UserModel.findById(worker.user);
    user.role.push("Worker");
    await user.save();
    let s = {
      title: "Application",
      subtitle: "Application Verified",
      body: " Congrats Your application as a worker has approved. Please login again to use as worker also",
      user: user._id,
    };
    Notification([user.token], s);
    let n = new NotificationModel();
    n = await n.addNotification(s);
    res.status(200).send(worker);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error Adding Admin!");
  }
});

router.get("/workerPdf", async (req, res) => {
  try {
    let user = await UserModel.getAllUser();
    let body = [
      [
        "Name",
        "Email",
        "Phone",
        "Gender",
        "Language",
        "Date Of Birth",
        "Pending Amount",
        "Restricted",
      ],
    ];
    for (var x of user) {
      let a = [
        x.name,
        x.email,
        x.phone,
        x.gender,
        x.language,
        x.dob,
        x.restrict,
      ];
      body.push(a);
    }
    var documentDefinition = {
      content: [
        { text: "Worker Details", style: "header" },
        { text: `Date ${new Date().toDateString()}`, style: "subheader" },
        { text: `Report`, style: "subheader" },
        {
          layout: "lightHorizontalLines",
          table: {
            style: "table",
            headerRows: 1,
            widths: [
              "auto",
              80,
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
              "auto",
            ],
            body,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        table: {
          margin: [0, 5, 0, 15],
        },
      },
    };
    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getBase64((data) => {
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment;filename="WorkerDetails.pdf"',
      });

      const download = Buffer.from(data.toString("utf-8"), "base64");
      res.end(download);
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error Adding Admin!");
  }
});

router.get("/userPdf", async (req, res) => {
  try {
    let user = await UserModel.getAllUser();
    let body = [
      [
        "Name",
        "Email",
        "Phone",
        "Gender",
        "Language",
        "Date Of Birth",
        "Restricted",
      ],
    ];
    for (var x of user) {
      let a = [
        x.name,
        x.email,
        x.phone,
        x.gender,
        x.language,
        x.dob,
        x.restrict,
      ];
      body.push(a);
    }
    var documentDefinition = {
      content: [
        { text: "User Details", style: "header" },
        { text: `Date ${new Date().toDateString()}`, style: "subheader" },
        { text: `Report`, style: "subheader" },
        {
          layout: "lightHorizontalLines",
          table: {
            style: "table",
            headerRows: 1,
            widths: ["auto", 100, "auto", "auto", "auto", "auto", "auto"],
            body,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        table: {
          margin: [0, 5, 0, 15],
        },
      },
    };
    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getBase64((data) => {
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment;filename="UserDetails.pdf"',
      });

      const download = Buffer.from(data.toString("utf-8"), "base64");
      res.end(download);
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error Adding Admin!");
  }
});

router.get("/categoriesPdf", async (req, res) => {
  try {
    let user = await CategoriesModel.getAllCategories();
    let ol = [];
    for (var x of user) {
      ol.push(x.name);
    }
    var documentDefinition = {
      content: [
        { text: "Categories List", style: "header" },
        { text: `Date ${new Date().toDateString()}`, style: "subheader" },
        { text: `Report`, style: "subheader" },
        {
          ol,
        },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
      },
    };
    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getBase64((data) => {
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment;filename="Categories.pdf"',
      });

      const download = Buffer.from(data.toString("utf-8"), "base64");
      res.end(download);
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error Adding Admin!");
  }
});

router.post("/", duplicateEmailValidator, adminValidator, async (req, res) => {
  try {
    let admin = new AdminModel();
    await admin.addAdmin(req.body);
    admin = await AdminModel.getAllAdmins();
    return res.status(200).send(admin);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error Adding Admin!");
  }
});

router.post("/contactUser", async (req, res) => {
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

    const html = ` <div style="margin: 20px">
    <h1 style="text-align: center; font-size: 42px">${req.body.subject}</h1>
    <h4>Dear Customer:</h4>
    <p style="margin-left:20px">This is the response from against the order id ${req.body.order_id}. ${req.body.msg}</p>
  </div>`;
    console.log(req.body);
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: config.get("email"),
      to: req.body.to,
      subject: req.body.subject,
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

router.put("/", async (req, res) => {
  try {
    let admin = await AdminModel.updateAdmin(req.body);
    delete admin["password"];
    return res.status(200).send(admin);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error Updating Admin!");
  }
});

router.put("/restrict/:id", async (req, res) => {
  try {
    let user = await UserModel.restrictUser(req.params.id);
    user = await UserModel.findById(req.params.id);
    let s = {
      title: "Restrict",
      subtitle: "Account restrict",
      body: " Your Account has been restrict !",
      user: user._id,
    };
    Notification([user.token], s);
    let n = new NotificationModel();
    n = await n.addNotification(s);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Restricting User!");
  }
});

router.put("/removeRestriction/:id", async (req, res) => {
  try {
    let user = await UserModel.removeRestrictionUser(req.params.id);
    user = await UserModel.findById(req.params.id);
    let s = {
      title: "Restrict",
      subtitle: "Account UnRestrict",
      body: "Restriction has been lifted!",
      user: user._id,
    };
    Notification([user.token], s);
    let n = new NotificationModel();
    n = await n.addNotification(s);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Remove Restricting User!");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await AdminModel.findByIdAndDelete(req.params.id);
    return res.status(200).send("User is Deleted!");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error Deleting Admin!");
  }
});
router.delete("/user/:id", async (req, res) => {
  try {
    let user = await UserModel.findById(req.params.id);
    if (user.role.includes("Worker")) {
      await WorkerModel.findOneAndDelete({ user: req.params.id });
      console.log("true");
    }
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).send("User is Deleted!");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all User!");
  }
});
router.delete("/worker/:id", async (req, res) => {
  try {
    let worker = await WorkerModel.findById(req.params.id);
    let user = await UserModel.findById(worker.user);
    user.role.pop();
    await user.save();
    await WorkerModel.findByIdAndDelete(req.params.id);
    res.status(200).send("User is Deleted!");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all User!");
  }
});
router.delete("/workerRequest/:id", async (req, res) => {
  try {
    let worker = await WorkerModel.findById(req.params.id);
    worker.registration_status = "Rejected";
    let user = await UserModel.findById(worker.user);
    let s = {
      title: "Application",
      subtitle: "Application Rejected",
      body: " Your Application has been Rejected !",
      user: worker.user,
    };
    Notification([user.token], s);
    let n = new NotificationModel();
    n = await n.addNotification(s);
    await worker.save();
    res.status(200).send("Application is Rejected!");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Deleting all worker!");
  }
});
module.exports = router;
