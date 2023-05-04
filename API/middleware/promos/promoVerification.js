let PromosModel = require("../../model/promos");
const moment = require("moment");
module.exports = async function (req, res, next) {
  const promos = await PromosModel.findOne({ code: req.params.code });
  if (!promos) {
    return res.status(400).send(`Promo not Found!`);
  } else if (!promos.used) {
    let a = moment(promos.endDate);
    let b = moment(new Date());
    if (a.diff(b, "days") < 0) return res.status(400).send(`Promo is Expired!`);
  } else {
    return res.status(400).send(`Promo is already used!`);
  }
  next();
};
