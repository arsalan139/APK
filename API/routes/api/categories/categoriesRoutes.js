const express = require('express');
const duplicateCategoriesValidator = require('../../../middleware/categories/duplicateCategoriesValidator');
const categoriesValidator = require('../../../middleware/categories/categoriesValidator');
const router = express.Router();
const CategoriesModel = require('../../../model/categories');
const auth = require('../../../middleware/auth/auth');

router.get('/', async (req, res) => {
  try {
    let Categories = await CategoriesModel.getAllCategories();
    return res.status(200).send(Categories);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error in Getting All Categories!');
  }
});

router.get('/:id', async (req, res) => {
  try {
    let Categories = await CategoriesModel.getCategoriesById(req.params.id);
    return res.status(200).send(Categories);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error in Getting Categories!');
  }
});

router.post(
  '/',
  // auth,
  duplicateCategoriesValidator,
  categoriesValidator,
  async (req, res) => {
    try {
      let Categories = new CategoriesModel();
      await Categories.addCategories(req.body);
      Categories = await CategoriesModel.getAllCategories();
      return res.status(200).send(Categories);
    } catch (err) {
      console.log(err);
      return res.status(400).send('Error in Adding Categories!');
    }
  }
);

router.put('/', auth, async (req, res) => {
  try {
    let Categories = await CategoriesModel.updateCategories(req.body);
    Categories = await CategoriesModel.getAllCategories();
    return res.status(200).send(Categories);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error Deleting Categories!');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await CategoriesModel.findByIdAndDelete(req.params.id);
    let Categories = await CategoriesModel.getAllCategories();
    return res.status(200).send(Categories);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Error Deleting Categories!');
  }
});

module.exports = router;
