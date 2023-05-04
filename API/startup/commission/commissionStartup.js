const auth = require('../../middleware/auth/auth');
const commissionRoutes = require('../../routes/api/commission/commissionRoutes');
module.exports = function (app) {
  app.use('/api/commission', commissionRoutes);
};
