var express = require('express');
const auth = require('../../../middleware/auth/auth');
const workerValidator = require('../../../middleware/worker/workerValidator');
const WorkerModel = require('../../../model/worker');
var router = express.Router();

router.get('/', async (req, res) => {
  try {
    let worker = await WorkerModel.getAllWorker();

    res.status(200).send(worker);
  } catch (err) {
    console.log(err);
    res.status(400).send('Error in Getting all worker!');
  }
});
router.get('/category/:category', async (req, res) => {
  try {
    let worker = await WorkerModel.getAllWorkerByCategory(req.params.category);
    res.status(200).send(worker);
  } catch (err) {
    console.log(err);
    res.status(400).send('Error in Getting all worker By Category!');
  }
});
/* GET workers listing. */
router.get('/:id', async (req, res) => {
  try {
    let worker = await WorkerModel.getWorkerById(req.params.id);
    res.status(200).send(worker);
  } catch (err) {
    console.log(err);
    res.status(400).send('Error in Getting worker!');
  }
});

/* GET workers listing. */
router.get('/application/status/:id', async (req, res) => {
  try {
    let worker = await WorkerModel.getWorkerApplicationStatus(req.params.id);
    res.status(200).send(worker);
  } catch (err) {
    console.log(err);
    res.status(400).send('Error in Getting worker!');
  }
});

router.post('/application', workerValidator, async (req, res) => {
  try {
    let user = new WorkerModel();
    user = await user.addWorker(req.body);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send('Error in Adding Worker!');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let worker = await WorkerModel.findById(req.params.id);
    worker.registration_status = 'Rejected';
    res.status(200).send('Application is Rejected!');
  } catch (err) {
    console.log(err);
    res.status(400).send('Error in Deleting all worker!');
  }
});

module.exports = router;
